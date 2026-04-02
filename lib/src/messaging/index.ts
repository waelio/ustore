/**
 * createMessagingStore
 *
 * Client-side bridge between @waelio/ustore and @waelio/messaging.
 *
 * Accepts a socket.io-client instance connected to a waelio-messaging server
 * and wires its events to uStore adapters:
 *
 *   localStorage   → persists message history across page refreshes
 *   sessionStorage → stores the assigned userId and display name for the session
 *   signalStorage  → reactive in-memory state (unread count, user list, typing)
 *
 * Usage:
 *   import { io } from 'socket.io-client';
 *   import { createMessagingStore } from '@waelio/ustore/messaging';
 *
 *   const socket = io('https://waelio-messaging.onrender.com');
 *   const store  = createMessagingStore(socket);
 *
 *   store.onMessage((msg) => console.log(msg));
 *   store.send('userId-123', 'hello!');
 */

import { localStorage } from '../_stores/localStorage';
import { sessionStorage } from '../_stores/sessionStorage';
import { signalStorage } from '../_stores/signalStorage';

// ─── Public types ──────────────────────────────────────────────────────────────

/** Shape of a message object returned by the waelio-messaging server. */
export interface WMMessage {
    _id: string;
    type: 'route' | 'broadcast' | 'room-message';
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

    // ── History ────────────────────────────────────────────────────────────────
    /**
     * Fetch server-side history and merge it into the local cache.
     * Resolves with the merged, timestamp-sorted array.
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
    /**
     * Subscribe to incoming messages. Returns an unsubscribe function.
     */
    onMessage(cb: (msg: WMMessage) => void): () => void;
    /**
     * Subscribe to user-list updates. Returns an unsubscribe function.
     */
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

const SESSION_USER_ID_KEY = 'wm_userId';
const SESSION_DISPLAY_NAME_KEY = 'wm_displayName';
const historyKey = (prefix: string, uid: string) => `${prefix}_history_${uid}`;
const signalKey = (prefix: string, k: string) => `${prefix}_state_${k}`;

// ─── Factory ───────────────────────────────────────────────────────────────────

/**
 * Wire a socket.io-client socket to uStore adapters.
 *
 * @param socket   A connected (or connecting) socket.io-client instance.
 * @param options  Optional configuration.
 */
export function createMessagingStore(
    socket: any,
    options: MessagingStoreOptions = {}
): MessagingStore {
    const { historyLimit = 200, storagePrefix = 'wm' } = options;

    // Restore userId from previous session if available
    let userId: string | null =
        (sessionStorage.get(SESSION_USER_ID_KEY) as string) || null;
    let connected = false;
    let roomId: string | null = null;

    const messageListeners: Array<(msg: WMMessage) => void> = [];
    const userListListeners: Array<(users: string[]) => void> = [];
    const typingListeners: Array<(id: string, isTyping: boolean) => void> = [];

    // ── Local-cache helpers ────────────────────────────────────────────────────

    function currentHistoryKey() {
        return historyKey(storagePrefix, userId ?? 'anon');
    }

    function getCachedHistory(): WMMessage[] {
        const stored = localStorage.get(currentHistoryKey());
        if (!stored || typeof stored !== 'object' || !Array.isArray(stored)) return [];
        return stored as WMMessage[];
    }

    function appendToCache(msg: WMMessage) {
        const history = getCachedHistory();
        history.push(msg);
        if (history.length > historyLimit) history.splice(0, history.length - historyLimit);
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

    function handleRegister({ id }: { id: string }) {
        userId = id;
        sessionStorage.set(SESSION_USER_ID_KEY, id);
        connected = true;
        setState('connected', true);
        setState('unread', 0);
    }

    function handleUserList({ users }: { users: string[] }) {
        setState('users', users);
        userListListeners.forEach((cb) => cb(users));
    }

    function handleMessageCreated(msg: WMMessage) {
        appendToCache(msg);
        const current = (getState('unread') as number) ?? 0;
        setState('unread', current + 1);
        messageListeners.forEach((cb) => cb(msg));
    }

    function handleUserTyping({ id }: { id: string }) {
        typingListeners.forEach((cb) => cb(id, true));
    }

    function handleUserStoppedTyping({ id }: { id: string }) {
        typingListeners.forEach((cb) => cb(id, false));
    }

    function handleRoomCreated({ roomId: rid }: { roomId: string }) {
        roomId = rid;
    }

    function handleDisconnect() {
        connected = false;
        setState('connected', false);
    }

    // Attach all listeners
    socket.on('register-success', handleRegister);
    socket.on('user-list', handleUserList);
    socket.on('messages created', handleMessageCreated);
    socket.on('user-typing', handleUserTyping);
    socket.on('user-stopped-typing', handleUserStoppedTyping);
    socket.on('rooms created', handleRoomCreated);
    socket.on('disconnect', handleDisconnect);

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
            socket.emit('messages::create', { type: 'route', to, payload });
        },

        broadcast(payload: unknown) {
            socket.emit('messages::create', { type: 'broadcast', payload });
        },

        joinRoom(partnerId: string) {
            socket.emit('rooms::create', { with: partnerId });
        },

        sendRoomMessage(payload: unknown) {
            if (!roomId) throw new Error('Not in a room — call joinRoom() first.');
            socket.emit('messages::create', { type: 'room-message', payload });
        },

        loadHistory(): Promise<WMMessage[]> {
            return new Promise((resolve) => {
                socket.emit('messages::find', {}, (msgs: WMMessage[]) => {
                    // Merge server history with local cache, deduplicated by _id
                    const cached = getCachedHistory();
                    const cachedIds = new Set(cached.map((m) => m._id));
                    const merged = [...cached];

                    msgs.forEach((m) => {
                        if (!cachedIds.has(m._id)) merged.push(m);
                    });

                    merged.sort(
                        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                    );

                    const limited = merged.slice(-historyLimit);
                    localStorage.set(currentHistoryKey(), limited);
                    resolve(limited);
                });
            });
        },

        getCachedHistory,

        clearHistory() {
            localStorage.remove(currentHistoryKey());
        },

        getUnread() {
            return (getState('unread') as number) ?? 0;
        },

        resetUnread() {
            setState('unread', 0);
        },

        getUsers() {
            return (getState('users') as string[]) ?? [];
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
            socket.off('register-success', handleRegister);
            socket.off('user-list', handleUserList);
            socket.off('messages created', handleMessageCreated);
            socket.off('user-typing', handleUserTyping);
            socket.off('user-stopped-typing', handleUserStoppedTyping);
            socket.off('rooms created', handleRoomCreated);
            socket.off('disconnect', handleDisconnect);
            messageListeners.length = 0;
            userListListeners.length = 0;
            typingListeners.length = 0;
        },
    };
}
