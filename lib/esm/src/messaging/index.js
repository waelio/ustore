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
    function handleRegister({ id }) {
        userId = id;
        sessionStorage.set(SESSION_USER_ID_KEY, id);
        connected = true;
        setState("connected", true);
        setState("unread", 0);
    }
    function handleUserList({ users }) {
        setState("users", users);
        userListListeners.forEach((cb) => cb(users));
    }
    function handleMessageCreated(msg) {
        appendToCache(msg);
        const current = getState("unread") ?? 0;
        setState("unread", current + 1);
        messageListeners.forEach((cb) => cb(msg));
    }
    function handleUserTyping({ id }) {
        typingListeners.forEach((cb) => cb(id, true));
    }
    function handleUserStoppedTyping({ id }) {
        typingListeners.forEach((cb) => cb(id, false));
    }
    function handleRoomCreated({ roomId: rid }) {
        roomId = rid;
    }
    function handleDisconnect() {
        connected = false;
        setState("connected", false);
    }
    socket.on("register-success", handleRegister);
    socket.on("user-list", handleUserList);
    socket.on("messages created", handleMessageCreated);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stopped-typing", handleUserStoppedTyping);
    socket.on("rooms created", handleRoomCreated);
    socket.on("disconnect", handleDisconnect);
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
            socket.emit("messages::create", { type: "route", to, payload });
        },
        broadcast(payload) {
            socket.emit("messages::create", { type: "broadcast", payload });
        },
        joinRoom(partnerId) {
            socket.emit("rooms::create", { with: partnerId });
        },
        sendRoomMessage(payload) {
            if (!roomId)
                throw new Error("Not in a room — call joinRoom() first.");
            socket.emit("messages::create", { type: "room-message", payload });
        },
        loadHistory() {
            return new Promise((resolve) => {
                socket.emit("messages::find", {}, (msgs) => {
                    const cached = getCachedHistory();
                    const cachedIds = new Set(cached.map((m) => m._id));
                    const merged = [...cached];
                    msgs.forEach((m) => {
                        if (!cachedIds.has(m._id))
                            merged.push(m);
                    });
                    merged.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
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
            socket.off("user-list", handleUserList);
            socket.off("messages created", handleMessageCreated);
            socket.off("user-typing", handleUserTyping);
            socket.off("user-stopped-typing", handleUserStoppedTyping);
            socket.off("rooms created", handleRoomCreated);
            socket.off("disconnect", handleDisconnect);
            messageListeners.length = 0;
            userListListeners.length = 0;
            typingListeners.length = 0;
        },
    };
}
//# sourceMappingURL=index.js.map