import { localStorage } from "../_stores/localStorage.js";
import { sessionStorage } from "../_stores/sessionStorage.js";
import { signalStorage } from "../_stores/signalStorage.js";
const SESSION_USER_ID_KEY = "wm_userId";
const SESSION_DISPLAY_NAME_KEY = "wm_displayName";
const historyKey = (prefix, uid) => `${prefix}_history_${uid}`;
const signalKey = (prefix, k) => `${prefix}_state_${k}`;
export function createMessagingStore(socket, options = {}) {
    const { historyLimit = 200, storagePrefix = "wm" } = options;
    let userId = sessionStorage.get(SESSION_USER_ID_KEY) || null;
    let connected = false;
    let roomId = null;
    const historyResolvers = [];
    const messageListeners = [];
    const userListListeners = [];
    const typingListeners = [];
    function currentHistoryKey() {
        return historyKey(storagePrefix, userId ?? "anon");
    }
    function getCachedHistory() {
        const stored = localStorage.get(currentHistoryKey());
        if (!stored || typeof stored !== "object" || !Array.isArray(stored))
            return [];
        return stored;
    }
    function appendToCache(msg) {
        const history = getCachedHistory();
        history.push(msg);
        if (history.length > historyLimit)
            history.splice(0, history.length - historyLimit);
        localStorage.set(currentHistoryKey(), history);
    }
    function setState(key, value) {
        signalStorage.set(signalKey(storagePrefix, key), value);
    }
    function getState(key) {
        return signalStorage.get(signalKey(storagePrefix, key));
    }
    function handleRegister(msg) {
        const id = msg?.id;
        if (!id)
            return;
        userId = id;
        sessionStorage.set(SESSION_USER_ID_KEY, id);
        connected = true;
        setState("connected", true);
        setState("unread", 0);
    }
    function handleUserList(msg) {
        const users = Array.isArray(msg?.users) ? msg.users : [];
        setState("users", users);
        userListListeners.forEach((cb) => cb(users));
    }
    function handleMessage(msg) {
        const wmMsg = {
            _id: msg?.id ?? crypto.randomUUID(),
            type: msg?.isBroadcast
                ? "broadcast"
                : msg?.roomId
                    ? "room-message"
                    : "route",
            payload: msg?.payload,
            senderId: msg?.from ?? "unknown",
            recipientId: msg?.to ?? null,
            roomId: msg?.roomId ?? null,
            isBroadcast: !!msg?.isBroadcast,
            timestamp: msg?.ts
                ? new Date(msg.ts).toISOString()
                : new Date().toISOString(),
        };
        appendToCache(wmMsg);
        const current = getState("unread") ?? 0;
        setState("unread", current + 1);
        messageListeners.forEach((cb) => cb(wmMsg));
    }
    function handleHistory(msg) {
        const serverMsgs = Array.isArray(msg?.history)
            ? msg.history
            : Array.isArray(msg?.messages)
                ? msg.messages
                : [];
        const cached = getCachedHistory();
        const cachedIds = new Set(cached.map((m) => m._id));
        const merged = [...cached];
        serverMsgs.forEach((m) => {
            if (!cachedIds.has(m._id))
                merged.push(m);
        });
        merged.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        const limited = merged.slice(-historyLimit);
        localStorage.set(currentHistoryKey(), limited);
        historyResolvers.splice(0).forEach((resolve) => resolve(limited));
    }
    function handleUserTyping(msg) {
        const id = msg?.id ?? "";
        if (id)
            typingListeners.forEach((cb) => cb(id, true));
    }
    function handleUserStoppedTyping(msg) {
        const id = msg?.id ?? "";
        if (id)
            typingListeners.forEach((cb) => cb(id, false));
    }
    function handleRoomJoined(msg) {
        roomId = msg?.roomId ?? null;
    }
    function handleDisconnect() {
        connected = false;
        setState("connected", false);
    }
    socket.on("register-success", handleRegister);
    socket.on("server:id", handleRegister);
    socket.on("user-list", handleUserList);
    socket.on("message", handleMessage);
    socket.on("chat:message", handleMessage);
    socket.on("message-history", handleHistory);
    socket.on("history", handleHistory);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stopped-typing", handleUserStoppedTyping);
    socket.on("joined-room", handleRoomJoined);
    socket.onClose(handleDisconnect);
    return {
        get userId() {
            return userId;
        },
        setDisplayName(name) {
            sessionStorage.set(SESSION_DISPLAY_NAME_KEY, name);
        },
        getDisplayName() {
            return sessionStorage.get(SESSION_DISPLAY_NAME_KEY) ?? null;
        },
        send(to, payload) {
            socket.send({ type: "route", to, payload });
        },
        broadcast(payload) {
            socket.send({ type: "broadcast", payload });
        },
        joinRoom(partnerId) {
            socket.send({ type: "join-room", with: partnerId });
        },
        sendRoomMessage(payload) {
            if (!roomId)
                throw new Error("Not in a room — call joinRoom() first.");
            socket.send({ type: "room-message", payload });
        },
        startTyping() {
            socket.send({ type: "start-typing" });
        },
        stopTyping() {
            socket.send({ type: "stop-typing" });
        },
        loadHistory() {
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
            return getState("unread") ?? 0;
        },
        resetUnread() {
            setState("unread", 0);
        },
        getUsers() {
            return getState("users") ?? [];
        },
        isConnected() {
            return connected;
        },
        onMessage(cb) {
            messageListeners.push(cb);
            return () => {
                const idx = messageListeners.indexOf(cb);
                if (idx > -1)
                    messageListeners.splice(idx, 1);
            };
        },
        onUserList(cb) {
            userListListeners.push(cb);
            return () => {
                const idx = userListListeners.indexOf(cb);
                if (idx > -1)
                    userListListeners.splice(idx, 1);
            };
        },
        onTyping(cb) {
            typingListeners.push(cb);
            return () => {
                const idx = typingListeners.indexOf(cb);
                if (idx > -1)
                    typingListeners.splice(idx, 1);
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
//# sourceMappingURL=index.js.map