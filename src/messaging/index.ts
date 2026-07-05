/**
 * createMessagingStore
 *
 * Client-side bridge between @waelio/ustore and @waelio/messaging.
 *
 * Accepts a WaelioSocket instance connected to a waelio-messaging server
 * and wires its events to uStore adapters:
 *
 *   localStorage   → persists message history across page refreshes
 *   sessionStorage → stores the assigned userId and display name for the session
 *   signalStorage  → reactive in-memory state (unread count, user list, typing)
 *
 * Usage:
 *   import { createSocket } from '@waelio/sockets';
 *   import { createMessagingStore } from '@waelio/ustore/messaging';
 *
 *   const socket = createSocket('wss://waelio-messaging.onrender.com');
 *   const store  = createMessagingStore(socket);
 *
 *   store.onMessage((msg) => console.log(msg));
 *   store.send('userId-123', 'hello!');
 */

import type { WaelioSocket } from "@waelio/sockets";
import { localStorage } from "../_stores/localStorage";
import { sessionStorage } from "../_stores/sessionStorage";
import { signalStorage } from "../_stores/signalStorage";

// ─── Public types ──────────────────────────────────────────────────────────────

/** Shape of a message object returned by the waelio-messaging server. */
export interface WMMessage {
  _id: string;
  type: "route" | "broadcast" | "room-message";
  payload: unknown;
  senderId: string;
  recipientId: string | null;
  roomId: string | null;
  isBroadcast: boolean;
  timestamp: string;
}

export interface MessagingStoreOptions {
  /** Maximum messages kept in localStorage cache (default: 200). */
  historyLimit?: number;
  /** Prefix used for all localStorage / signalStorage keys (default: 'wm'). */
  storagePrefix?: string;
}

export interface MessagingStore {
  /** The socket ID assigned by the server after connect. Null until registered. */
  readonly userId: string | null;

  // ── Identity ───────────────────────────────────────────────────────────────
  setDisplayName(name: string): void;
  getDisplayName(): string | null;

  // ── Messaging ──────────────────────────────────────────────────────────────
  /** Send a direct message to another user. */
  send(to: string, payload: unknown): void;
  /** Broadcast a message to all connected users (excluding caller). */
  broadcast(payload: unknown): void;
  /** Create / join a private room with another user. */
  joinRoom(partnerId: string): void;
  /** Send a message inside the current room (requires joinRoom first). */
  sendRoomMessage(payload: unknown): void;
  /** Signal that the local user started typing. */
  startTyping(): void;
  /** Signal that the local user stopped typing. */
  stopTyping(): void;

  // ── History ────────────────────────────────────────────────────────────────
  /**
   * Request server-side history. Resolves when the server responds.
   * Merges with local cache and returns the combined, sorted array.
   */
  loadHistory(): Promise<WMMessage[]>;
  /** Return the locally cached messages without hitting the server. */
  getCachedHistory(): WMMessage[];
  /** Wipe local history cache. */
  clearHistory(): void;

  // ── Reactive state ─────────────────────────────────────────────────────────
  /** Number of messages received since last resetUnread(). */
  getUnread(): number;
  /** Reset unread counter to 0. */
  resetUnread(): void;
  /** Current list of connected user IDs. */
  getUsers(): string[];
  /** Whether the socket is connected and registered. */
  isConnected(): boolean;

  // ── Event subscriptions ────────────────────────────────────────────────────
  /** Subscribe to incoming messages. Returns an unsubscribe function. */
  onMessage(cb: (msg: WMMessage) => void): () => void;
  /** Subscribe to user-list updates. Returns an unsubscribe function. */
  onUserList(cb: (users: string[]) => void): () => void;
  /**
   * Subscribe to typing events. `isTyping` is true when started, false when stopped.
   * Returns an unsubscribe function.
   */
  onTyping(cb: (userId: string, isTyping: boolean) => void): () => void;

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  /** Remove all socket listeners and internal subscriber lists. */
  destroy(): void;
}

// ─── Storage key helpers ───────────────────────────────────────────────────────

const SESSION_USER_ID_KEY = "wm_userId";
const SESSION_DISPLAY_NAME_KEY = "wm_displayName";
const historyKey = (prefix: string, uid: string) => `${prefix}_history_${uid}`;
const signalKey = (prefix: string, k: string) => `${prefix}_state_${k}`;

// ─── Factory ───────────────────────────────────────────────────────────────────

/**
 * Wire a WaelioSocket to uStore adapters.
 *
 * @param socket   A connected (or connecting) WaelioSocket instance from @waelio/sockets.
 * @param options  Optional configuration.
 */
export function createMessagingStore(
  socket: WaelioSocket,
  options: MessagingStoreOptions = {}
): MessagingStore {
  const { historyLimit = 200, storagePrefix = "wm" } = options;

  // Restore userId from previous session if available
  let userId: string | null =
    (sessionStorage.get(SESSION_USER_ID_KEY) as string) || null;
  let connected = false;
  let roomId: string | null = null;

  // Pending history resolve callbacks
  const historyResolvers: Array<(msgs: WMMessage[]) => void> = [];

  const messageListeners: Array<(msg: WMMessage) => void> = [];
  const userListListeners: Array<(users: string[]) => void> = [];
  const typingListeners: Array<(id: string, isTyping: boolean) => void> = [];

  // ── Local-cache helpers ────────────────────────────────────────────────────

  function currentHistoryKey() {
    return historyKey(storagePrefix, userId ?? "anon");
  }

  function getCachedHistory(): WMMessage[] {
    const stored = localStorage.get(currentHistoryKey());
    if (!stored || typeof stored !== "object" || !Array.isArray(stored))
      return [];
    return stored as WMMessage[];
  }

  function appendToCache(msg: WMMessage) {
    const history = getCachedHistory();
    history.push(msg);
    if (history.length > historyLimit)
      history.splice(0, history.length - historyLimit);
    localStorage.set(currentHistoryKey(), history);
  }

  // ── signalStorage state helpers ────────────────────────────────────────────

  function setState(key: string, value: unknown) {
    signalStorage.set(signalKey(storagePrefix, key), value as string | object);
  }

  function getState(key: string): unknown {
    return signalStorage.get(signalKey(storagePrefix, key));
  }

  // ── Socket event handlers ──────────────────────────────────────────────────

  function handleRegister(msg: any) {
    const id: string = msg?.id;
    if (!id) return;
    userId = id;
    sessionStorage.set(SESSION_USER_ID_KEY, id);
    connected = true;
    setState("connected", true);
    setState("unread", 0);
  }

  function handleUserList(msg: any) {
    const users: string[] = Array.isArray(msg?.users) ? msg.users : [];
    setState("users", users);
    userListListeners.forEach((cb) => cb(users));
  }

  function handleMessage(msg: any) {
    // Native WS server sends { type: 'message', from, payload, ... }
    const wmMsg: WMMessage = {
      _id: msg?.id ?? crypto.randomUUID(),
      type: msg?.isBroadcast ? "broadcast" : msg?.roomId ? "room-message" : "route",
      payload: msg?.payload,
      senderId: msg?.from ?? "unknown",
      recipientId: msg?.to ?? null,
      roomId: msg?.roomId ?? null,
      isBroadcast: !!msg?.isBroadcast,
      timestamp: msg?.ts ? new Date(msg.ts).toISOString() : new Date().toISOString(),
    };
    appendToCache(wmMsg);
    const current = (getState("unread") as number) ?? 0;
    setState("unread", current + 1);
    messageListeners.forEach((cb) => cb(wmMsg));
  }

  function handleHistory(msg: any) {
    const serverMsgs: WMMessage[] = Array.isArray(msg?.history)
      ? msg.history
      : Array.isArray(msg?.messages)
      ? msg.messages
      : [];

    const cached = getCachedHistory();
    const cachedIds = new Set(cached.map((m) => m._id));
    const merged = [...cached];

    serverMsgs.forEach((m) => {
      if (!cachedIds.has(m._id)) merged.push(m);
    });

    merged.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const limited = merged.slice(-historyLimit);
    localStorage.set(currentHistoryKey(), limited);

    // Resolve any pending loadHistory() promises
    historyResolvers.splice(0).forEach((resolve) => resolve(limited));
  }

  function handleUserTyping(msg: any) {
    const id: string = msg?.id ?? "";
    if (id) typingListeners.forEach((cb) => cb(id, true));
  }

  function handleUserStoppedTyping(msg: any) {
    const id: string = msg?.id ?? "";
    if (id) typingListeners.forEach((cb) => cb(id, false));
  }

  function handleRoomJoined(msg: any) {
    roomId = msg?.roomId ?? null;
  }

  function handleDisconnect() {
    connected = false;
    setState("connected", false);
  }

  // Attach all listeners using native WaelioSocket .on()
  socket.on("register-success", handleRegister);
  socket.on("server:id", handleRegister);         // @waelio/messaging server uses register-success; MessagingHub uses server:id
  socket.on("user-list", handleUserList);
  socket.on("message", handleMessage);             // MessagingHub sends type:'message'
  socket.on("chat:message", handleMessage);        // socket-server.ts sends type:'chat:message'
  socket.on("message-history", handleHistory);
  socket.on("history", handleHistory);
  socket.on("user-typing", handleUserTyping);
  socket.on("user-stopped-typing", handleUserStoppedTyping);
  socket.on("joined-room", handleRoomJoined);

  socket.onClose(handleDisconnect);

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    get userId() {
      return userId;
    },

    setDisplayName(name: string) {
      sessionStorage.set(SESSION_DISPLAY_NAME_KEY, name);
    },

    getDisplayName() {
      return (sessionStorage.get(SESSION_DISPLAY_NAME_KEY) as string) ?? null;
    },

    send(to: string, payload: unknown) {
      socket.send({ type: "route", to, payload });
    },

    broadcast(payload: unknown) {
      socket.send({ type: "broadcast", payload });
    },

    joinRoom(partnerId: string) {
      socket.send({ type: "join-room", with: partnerId });
    },

    sendRoomMessage(payload: unknown) {
      if (!roomId) throw new Error("Not in a room — call joinRoom() first.");
      socket.send({ type: "room-message", payload });
    },

    startTyping() {
      socket.send({ type: "start-typing" });
    },

    stopTyping() {
      socket.send({ type: "stop-typing" });
    },

    loadHistory(): Promise<WMMessage[]> {
      return new Promise((resolve) => {
        historyResolvers.push(resolve);
        socket.send({ type: "get-history" });
      });
    },

    getCachedHistory,

    clearHistory() {
      localStorage.remove(currentHistoryKey());
    },

    getUnread() {
      return (getState("unread") as number) ?? 0;
    },

    resetUnread() {
      setState("unread", 0);
    },

    getUsers() {
      return (getState("users") as string[]) ?? [];
    },

    isConnected() {
      return connected;
    },

    onMessage(cb: (msg: WMMessage) => void) {
      messageListeners.push(cb);
      return () => {
        const idx = messageListeners.indexOf(cb);
        if (idx > -1) messageListeners.splice(idx, 1);
      };
    },

    onUserList(cb: (users: string[]) => void) {
      userListListeners.push(cb);
      return () => {
        const idx = userListListeners.indexOf(cb);
        if (idx > -1) userListListeners.splice(idx, 1);
      };
    },

    onTyping(cb: (id: string, isTyping: boolean) => void) {
      typingListeners.push(cb);
      return () => {
        const idx = typingListeners.indexOf(cb);
        if (idx > -1) typingListeners.splice(idx, 1);
      };
    },

    destroy() {
      socket.off("register-success", handleRegister);
      socket.off("server:id", handleRegister);
      socket.off("user-list", handleUserList);
      socket.off("message", handleMessage);
      socket.off("chat:message", handleMessage);
      socket.off("message-history", handleHistory);
      socket.off("history", handleHistory);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stopped-typing", handleUserStoppedTyping);
      socket.off("joined-room", handleRoomJoined);
      messageListeners.length = 0;
      userListListeners.length = 0;
      typingListeners.length = 0;
    },
  };
}
