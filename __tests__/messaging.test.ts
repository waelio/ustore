/**
 * Tests for createMessagingStore — the uStore ↔ @waelio/messaging bridge.
 *
 * Uses a lightweight EventEmitter-based socket mock so no real server is needed.
 */

import { createMessagingStore, WMMessage } from '../src/messaging/index';

// ─── Socket mock ───────────────────────────────────────────────────────────────

type Handler = (...args: any[]) => void;

function createMockSocket() {
    const handlers: Record<string, Handler[]> = {};

    return {
        // --- methods called by the store ---
        on(event: string, cb: Handler) {
            (handlers[event] ??= []).push(cb);
        },
        off(event: string, cb: Handler) {
            if (!handlers[event]) return;
            handlers[event] = handlers[event].filter((h) => h !== cb);
        },
        emit: jest.fn(),

        // --- test helpers: simulate server pushing events ---
        _trigger(event: string, ...args: any[]) {
            (handlers[event] ?? []).forEach((h) => h(...args));
        },
        _listenerCount(event: string): number {
            return (handlers[event] ?? []).length;
        },
    };
}

// ─── Fixtures ──────────────────────────────────────────────────────────────────

function makeMsg(overrides: Partial<WMMessage> = {}): WMMessage {
    return {
        _id: `id-${Math.random().toString(36).slice(2)}`,
        type: 'route',
        payload: 'hello',
        senderId: 'alice',
        recipientId: 'bob',
        roomId: null,
        isBroadcast: false,
        timestamp: new Date().toISOString(),
        ...overrides,
    };
}

// ─── Tests ─────────────────────────────────────────────────────────────────────

describe('createMessagingStore', () => {
    let socket: ReturnType<typeof createMockSocket>;

    beforeEach(() => {
        socket = createMockSocket();
        // Wipe localStorage/session to avoid cross-test bleed
        window.localStorage.clear();
        window.sessionStorage.clear();
    });

    // ── Construction ─────────────────────────────────────────────────────────────

    it('returns a MessagingStore object with required methods', () => {
        const store = createMessagingStore(socket);
        expect(typeof store.send).toBe('function');
        expect(typeof store.broadcast).toBe('function');
        expect(typeof store.joinRoom).toBe('function');
        expect(typeof store.sendRoomMessage).toBe('function');
        expect(typeof store.loadHistory).toBe('function');
        expect(typeof store.getCachedHistory).toBe('function');
        expect(typeof store.clearHistory).toBe('function');
        expect(typeof store.getUnread).toBe('function');
        expect(typeof store.resetUnread).toBe('function');
        expect(typeof store.getUsers).toBe('function');
        expect(typeof store.isConnected).toBe('function');
        expect(typeof store.onMessage).toBe('function');
        expect(typeof store.onUserList).toBe('function');
        expect(typeof store.onTyping).toBe('function');
        expect(typeof store.destroy).toBe('function');
        store.destroy();
    });

    it('userId is null before register-success event', () => {
        const store = createMessagingStore(socket);
        expect(store.userId).toBeNull();
        store.destroy();
    });

    it('isConnected() is false before register-success', () => {
        const store = createMessagingStore(socket);
        expect(store.isConnected()).toBe(false);
        store.destroy();
    });

    // ── register-success ─────────────────────────────────────────────────────────

    it('sets userId after register-success event', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        expect(store.userId).toBe('user-abc');
        store.destroy();
    });

    it('marks isConnected() true after register-success', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        expect(store.isConnected()).toBe(true);
        store.destroy();
    });

    it('resets unread counter to 0 on register', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        expect(store.getUnread()).toBe(0);
        store.destroy();
    });

    // ── Identity ─────────────────────────────────────────────────────────────────

    it('setDisplayName / getDisplayName round-trips', () => {
        const store = createMessagingStore(socket);
        store.setDisplayName('Alice');
        expect(store.getDisplayName()).toBe('Alice');
        store.destroy();
    });

    it('getDisplayName returns null when nothing set', () => {
        const store = createMessagingStore(socket);
        expect(store.getDisplayName()).toBeNull();
        store.destroy();
    });

    // ── user-list event ───────────────────────────────────────────────────────────

    it('getUsers() returns the last user-list received', () => {
        const store = createMessagingStore(socket);
        socket._trigger('user-list', { users: ['alice', 'bob', 'carol'] });
        expect(store.getUsers()).toEqual(['alice', 'bob', 'carol']);
        store.destroy();
    });

    it('notifies onUserList subscribers', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        store.onUserList(cb);
        socket._trigger('user-list', { users: ['x'] });
        expect(cb).toHaveBeenCalledWith(['x']);
        store.destroy();
    });

    it('onUserList unsubscribe stops notifications', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        const unsub = store.onUserList(cb);
        unsub();
        socket._trigger('user-list', { users: ['x'] });
        expect(cb).not.toHaveBeenCalled();
        store.destroy();
    });

    // ── messages created event ────────────────────────────────────────────────────

    it('caches incoming messages in localStorage', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        const msg = makeMsg();
        socket._trigger('messages created', msg);
        const cached = store.getCachedHistory();
        expect(cached).toHaveLength(1);
        expect(cached[0]._id).toBe(msg._id);
        store.destroy();
    });

    it('increments unread counter on each incoming message', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        socket._trigger('messages created', makeMsg());
        socket._trigger('messages created', makeMsg());
        expect(store.getUnread()).toBe(2);
        store.destroy();
    });

    it('notifies onMessage subscribers', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        store.onMessage(cb);
        const msg = makeMsg();
        socket._trigger('messages created', msg);
        expect(cb).toHaveBeenCalledWith(msg);
        store.destroy();
    });

    it('onMessage unsubscribe stops notifications', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        const unsub = store.onMessage(cb);
        unsub();
        socket._trigger('messages created', makeMsg());
        expect(cb).not.toHaveBeenCalled();
        store.destroy();
    });

    // ── resetUnread ───────────────────────────────────────────────────────────────

    it('resetUnread() zeroes the counter', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        socket._trigger('messages created', makeMsg());
        store.resetUnread();
        expect(store.getUnread()).toBe(0);
        store.destroy();
    });

    // ── History ───────────────────────────────────────────────────────────────────

    it('getCachedHistory returns [] when nothing cached', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'fresh-user' });
        expect(store.getCachedHistory()).toEqual([]);
        store.destroy();
    });

    it('clearHistory wipes the cache', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        socket._trigger('messages created', makeMsg());
        store.clearHistory();
        expect(store.getCachedHistory()).toEqual([]);
        store.destroy();
    });

    it('loadHistory merges server msgs with cache (dedup by _id)', async () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });

        const shared = makeMsg({ timestamp: '2024-01-01T10:00:00.000Z' });
        const serverOnly = makeMsg({ timestamp: '2024-01-01T11:00:00.000Z' });

        // Pre-populate cache with shared message
        socket._trigger('messages created', shared);

        // loadHistory: server returns shared + serverOnly
        socket.emit.mockImplementationOnce((_evt: any, _payload: any, cb: any) => {
            cb([shared, serverOnly]);
        });

        const result = await store.loadHistory();
        expect(result).toHaveLength(2);
        // Timestamps should be ascending
        expect(result[0]._id).toBe(shared._id);
        expect(result[1]._id).toBe(serverOnly._id);
        store.destroy();
    });

    it('loadHistory respects historyLimit', async () => {
        const store = createMessagingStore(socket, { historyLimit: 3 });
        socket._trigger('register-success', { id: 'user-abc' });

        const msgs = Array.from({ length: 5 }, (_, i) =>
            makeMsg({ timestamp: new Date(1_000_000 + i * 1000).toISOString() })
        );

        socket.emit.mockImplementationOnce((_: any, __: any, cb: any) => cb(msgs));
        const result = await store.loadHistory();
        expect(result).toHaveLength(3);
        store.destroy();
    });

    // ── Outgoing messages ─────────────────────────────────────────────────────────

    it('send() emits messages::create with type route', () => {
        const store = createMessagingStore(socket);
        store.send('bob', 'hi');
        expect(socket.emit).toHaveBeenCalledWith('messages::create', {
            type: 'route',
            to: 'bob',
            payload: 'hi',
        });
        store.destroy();
    });

    it('broadcast() emits messages::create with type broadcast', () => {
        const store = createMessagingStore(socket);
        store.broadcast({ text: 'hello all' });
        expect(socket.emit).toHaveBeenCalledWith('messages::create', {
            type: 'broadcast',
            payload: { text: 'hello all' },
        });
        store.destroy();
    });

    it('joinRoom() emits rooms::create', () => {
        const store = createMessagingStore(socket);
        store.joinRoom('carol');
        expect(socket.emit).toHaveBeenCalledWith('rooms::create', { with: 'carol' });
        store.destroy();
    });

    it('sendRoomMessage() throws when not in a room', () => {
        const store = createMessagingStore(socket);
        expect(() => store.sendRoomMessage('hey')).toThrow();
        store.destroy();
    });

    it('sendRoomMessage() emits after rooms created event', () => {
        const store = createMessagingStore(socket);
        socket._trigger('rooms created', { roomId: 'room-99', userId: 'alice', partnerId: 'bob' });
        store.sendRoomMessage('hey room');
        expect(socket.emit).toHaveBeenCalledWith('messages::create', {
            type: 'room-message',
            payload: 'hey room',
        });
        store.destroy();
    });

    // ── Typing events ─────────────────────────────────────────────────────────────

    it('notifies onTyping with isTyping=true on user-typing', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        store.onTyping(cb);
        socket._trigger('user-typing', { id: 'dave' });
        expect(cb).toHaveBeenCalledWith('dave', true);
        store.destroy();
    });

    it('notifies onTyping with isTyping=false on user-stopped-typing', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        store.onTyping(cb);
        socket._trigger('user-stopped-typing', { id: 'dave' });
        expect(cb).toHaveBeenCalledWith('dave', false);
        store.destroy();
    });

    it('onTyping unsubscribe stops notifications', () => {
        const store = createMessagingStore(socket);
        const cb = jest.fn();
        const unsub = store.onTyping(cb);
        unsub();
        socket._trigger('user-typing', { id: 'dave' });
        expect(cb).not.toHaveBeenCalled();
        store.destroy();
    });

    // ── disconnect ────────────────────────────────────────────────────────────────

    it('marks isConnected() false on disconnect', () => {
        const store = createMessagingStore(socket);
        socket._trigger('register-success', { id: 'user-abc' });
        socket._trigger('disconnect');
        expect(store.isConnected()).toBe(false);
        store.destroy();
    });

    // ── destroy ───────────────────────────────────────────────────────────────────

    it('destroy() removes all socket listeners', () => {
        const store = createMessagingStore(socket);
        store.destroy();
        const events = [
            'register-success', 'user-list', 'messages created',
            'user-typing', 'user-stopped-typing', 'rooms created', 'disconnect',
        ];
        events.forEach((ev) => {
            expect(socket._listenerCount(ev)).toBe(0);
        });
    });

    it('destroy() clears internal subscriber lists', () => {
        const store = createMessagingStore(socket);
        const msgCb = jest.fn();
        const ulCb = jest.fn();
        const typCb = jest.fn();
        store.onMessage(msgCb);
        store.onUserList(ulCb);
        store.onTyping(typCb);
        store.destroy();
        // Listeners were already detached from socket, but also check no internal
        // callbacks fire after destroy (socket events would not be forwarded):
        socket._trigger('messages created', makeMsg());
        socket._trigger('user-list', { users: [] });
        socket._trigger('user-typing', { id: 'x' });
        expect(msgCb).not.toHaveBeenCalled();
        expect(ulCb).not.toHaveBeenCalled();
        expect(typCb).not.toHaveBeenCalled();
    });

    // ── Custom storagePrefix ──────────────────────────────────────────────────────

    it('two stores with different prefixes do not share history', () => {
        const socketA = createMockSocket();
        const socketB = createMockSocket();
        const storeA = createMessagingStore(socketA, { storagePrefix: 'alpha' });
        const storeB = createMessagingStore(socketB, { storagePrefix: 'beta' });

        socketA._trigger('register-success', { id: 'user-A' });
        socketB._trigger('register-success', { id: 'user-A' }); // same userId, different prefix

        socketA._trigger('messages created', makeMsg());
        expect(storeA.getCachedHistory()).toHaveLength(1);
        expect(storeB.getCachedHistory()).toHaveLength(0);

        storeA.destroy();
        storeB.destroy();
    });
});
