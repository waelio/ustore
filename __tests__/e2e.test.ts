/**
 * End-to-end tests for uStore
 *
 * Tests the full CRUD lifecycle (set → has → get → remove → has) for the
 * supported in-process adapters, exercising both the `uStore.<type>` access
 * pattern and the direct named export. Multiple payload types are validated
 * for each adapter to confirm type fidelity. Network-backed adapters such as
 * Gun keep their own focused tests.
 */

import { describe, expect, test, beforeEach } from '@jest/globals';
import {
    uStore,
    localStorage,
    sessionStorage,
    cookieStorage,
    memoryStorage,
    piniaStorage,
    vuexStorage,
    secureStorage,
    configStorage,
    signalStorage,
} from '../index';
import { createServerStorage } from '../src/server';

jest.mock('localforage');
jest.mock('@keyv/mongo', () => jest.fn(() => new Map()));

// ─── helpers ──────────────────────────────────────────────────────────────────

const KEY = 'e2e_key';
const STR_VAL = 'hello uStore';
const NUM_VAL = 42;
const OBJ_VAL = { nested: true, count: 3 };

const PAYLOADS: Array<[string, string | object]> = [
    ['strVal', STR_VAL],
    ['objVal', OBJ_VAL],
];

describe('e2e: localStorage', () => {
    beforeEach(() => {
        uStore.local.remove(KEY);
        localStorage.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.local %s payload', (_label, value) => {
        uStore.local.set(KEY, value);
        expect(uStore.local.has(KEY)).toBe(true);
        expect(uStore.local.get(KEY)).toEqual(value);
        uStore.local.remove(KEY);
        expect(uStore.local.has(KEY)).toBe(false);
    });

    test.each(PAYLOADS)('localStorage direct %s payload', (_label, value) => {
        localStorage.set(KEY, value);
        expect(localStorage.has(KEY)).toBe(true);
        expect(localStorage.get(KEY)).toEqual(value);
        localStorage.remove(KEY);
        expect(localStorage.has(KEY)).toBe(false);
    });
});

// ─── sessionStorage ───────────────────────────────────────────────────────────

describe('e2e: sessionStorage', () => {
    beforeEach(() => {
        uStore.session.remove(KEY);
        sessionStorage.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.session %s payload', (_label, value) => {
        uStore.session.set(KEY, value);
        expect(uStore.session.has(KEY)).toBe(true);
        expect(uStore.session.get(KEY)).toEqual(value);
        uStore.session.remove(KEY);
        expect(uStore.session.has(KEY)).toBe(false);
    });

    test.each(PAYLOADS)('sessionStorage direct %s payload', (_label, value) => {
        sessionStorage.set(KEY, value);
        expect(sessionStorage.has(KEY)).toBe(true);
        expect(sessionStorage.get(KEY)).toEqual(value);
        sessionStorage.remove(KEY);
        expect(sessionStorage.has(KEY)).toBe(false);
    });
});

// ─── cookieStorage ────────────────────────────────────────────────────────────

describe('e2e: cookieStorage', () => {
    beforeEach(() => {
        uStore.cookie.remove(KEY);
        cookieStorage.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.cookie %s payload', (_label, value) => {
        uStore.cookie.set(KEY, value);
        // cookie get returns "key=value" string
        expect(uStore.cookie.get(KEY)).toEqual(`${KEY}=${value}`);
        expect(uStore.cookie.has(KEY)).toBe(true);
        uStore.cookie.remove(KEY);
        expect(uStore.cookie.has(KEY)).toBe(false);
    });

    test.each(PAYLOADS)('cookieStorage direct %s payload', (_label, value) => {
        cookieStorage.set(KEY, value);
        expect(cookieStorage.get(KEY)).toEqual(`${KEY}=${value}`);
        expect(cookieStorage.has(KEY)).toBe(true);
        cookieStorage.remove(KEY);
        expect(cookieStorage.has(KEY)).toBe(false);
    });
});

// ─── memoryStorage ────────────────────────────────────────────────────────────

describe('e2e: memoryStorage', () => {
    beforeEach(() => {
        uStore.memory.remove(KEY);
        memoryStorage.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.memory %s payload', (_label, value) => {
        uStore.memory.set(KEY, value);
        expect(uStore.memory.has(KEY)).toBe(true);
        expect(uStore.memory.get(KEY)).toEqual(value);
        uStore.memory.remove(KEY);
        expect(uStore.memory.has(KEY)).toBe(false);
    });

    test.each(PAYLOADS)('memoryStorage direct %s payload', (_label, value) => {
        memoryStorage.set(KEY, value);
        expect(memoryStorage.has(KEY)).toBe(true);
        expect(memoryStorage.get(KEY)).toEqual(value);
        memoryStorage.remove(KEY);
        expect(memoryStorage.has(KEY)).toBe(false);
    });
});

// ─── piniaStorage ─────────────────────────────────────────────────────────────

describe('e2e: piniaStorage', () => {
    beforeEach(() => {
        uStore.pinia.remove(KEY);
        piniaStorage.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.pinia %s payload', (_label, value) => {
        uStore.pinia.set(KEY, value);
        expect(uStore.pinia.has(KEY)).toBe(true);
        expect(uStore.pinia.get(KEY)).toEqual(value);
        uStore.pinia.remove(KEY);
        expect(uStore.pinia.has(KEY)).toBe(false);
    });

    test.each(PAYLOADS)('piniaStorage direct %s payload', (_label, value) => {
        piniaStorage.set(KEY, value);
        expect(piniaStorage.has(KEY)).toBe(true);
        expect(piniaStorage.get(KEY)).toEqual(value);
        piniaStorage.remove(KEY);
        expect(piniaStorage.has(KEY)).toBe(false);
    });
});

// ─── vuexStorage ──────────────────────────────────────────────────────────────

describe('e2e: vuexStorage', () => {
    beforeEach(() => {
        uStore.vuex.remove(KEY);
        vuexStorage.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.vuex %s payload', (_label, value) => {
        uStore.vuex.set(KEY, value);
        expect(uStore.vuex.has()).toBe(true);
        expect(uStore.vuex.get()).toEqual(value);
        uStore.vuex.remove(KEY);
        expect(uStore.vuex.has()).toBe(false);
    });

    test.each(PAYLOADS)('vuexStorage direct %s payload', (_label, value) => {
        vuexStorage.set(KEY, value);
        expect(vuexStorage.has()).toBe(true);
        expect(vuexStorage.get()).toEqual(value);
        vuexStorage.remove(KEY);
        expect(vuexStorage.has()).toBe(false);
    });
});

// ─── secureStorage ────────────────────────────────────────────────────────────

describe('e2e: secureStorage', () => {
    beforeEach(() => {
        uStore.secure.remove(KEY);
        secureStorage.remove(KEY);
    });

    test('uStore.secure default salt round-trip', () => {
        uStore.secure.set(KEY, STR_VAL);
        expect(uStore.secure.has(KEY)).toBeTruthy();
        expect(uStore.secure.getItem(KEY)).toEqual(STR_VAL);
        uStore.secure.remove(KEY);
        expect(uStore.secure.has(KEY)).toBeFalsy();
    });

    test('uStore.secure custom salt round-trip', () => {
        const opts = { salt: 'e2e-salt' };
        uStore.secure.set(KEY, STR_VAL, opts);
        expect(uStore.secure.getItem(KEY, opts)).toEqual(STR_VAL);
        uStore.secure.remove(KEY);
        expect(uStore.secure.has(KEY)).toBeFalsy();
    });

    test('secureStorage direct default salt round-trip', () => {
        secureStorage.set(KEY, STR_VAL);
        expect(secureStorage.has(KEY)).toBeTruthy();
        expect(secureStorage.getItem(KEY)).toEqual(STR_VAL);
        secureStorage.remove(KEY);
        expect(secureStorage.has(KEY)).toBeFalsy();
    });
});

describe('e2e: configStorage', () => {
    test('uStore.config set and get string value', () => {
        uStore.config.set(KEY, STR_VAL);
        expect(uStore.config.get(KEY)).toEqual(STR_VAL);
        expect(uStore.config.getItem(KEY)).toEqual(STR_VAL);
    });

    test('uStore.config set and get nested key', () => {
        uStore.config.set('e2e_nested:child', NUM_VAL);
        expect(uStore.config.get('e2e_nested:child')).toEqual(NUM_VAL);
    });

    test('configStorage direct top-level buckets are objects', () => {
        expect(typeof configStorage.client()).toBe('object');
        expect(typeof configStorage.server()).toBe('object');
        expect(typeof configStorage.dev()).toBe('object');
    });

    test('configStorage direct set and get round-trip', () => {
        configStorage.set(KEY, OBJ_VAL);
        expect(configStorage.get(KEY)).toEqual(OBJ_VAL);
    });
});

describe('e2e: signalStorage', () => {
    beforeEach(() => {
        signalStorage.remove(KEY);
        uStore.signal.remove(KEY);
    });

    test.each(PAYLOADS)('uStore.signal %s payload CRUD', (_label, value) => {
        uStore.signal.set(KEY, value);
        expect(uStore.signal.has(KEY)).toBe(true);
        expect(uStore.signal.get(KEY)).toEqual(value);
        uStore.signal.remove(KEY);
        expect(uStore.signal.has(KEY)).toBe(false);
    });

    test.each(PAYLOADS)('signalStorage direct %s payload CRUD', (_label, value) => {
        signalStorage.set(KEY, value);
        expect(signalStorage.has(KEY)).toBe(true);
        expect(signalStorage.get(KEY)).toEqual(value);
        signalStorage.remove(KEY);
        expect(signalStorage.has(KEY)).toBe(false);
    });
});

describe('e2e: cross-adapter isolation', () => {
    const ISO_KEY = 'isolation_key';
    const VAL_A = 'adapter-A';
    const VAL_B = 'adapter-B';

    beforeEach(() => {
        memoryStorage.remove(ISO_KEY);
        signalStorage.remove(ISO_KEY);
        localStorage.remove(ISO_KEY);
    });

    test('writing to memoryStorage does not affect signalStorage', () => {
        memoryStorage.set(ISO_KEY, VAL_A);
        signalStorage.set(ISO_KEY, VAL_B);
        expect(memoryStorage.get(ISO_KEY)).toEqual(VAL_A);
        expect(signalStorage.get(ISO_KEY)).toEqual(VAL_B);
    });

    test('writing to localStorage does not affect memoryStorage', () => {
        localStorage.set(ISO_KEY, VAL_A);
        expect(memoryStorage.has(ISO_KEY)).toBe(false);
    });

    test('removing from one adapter does not affect another', () => {
        memoryStorage.set(ISO_KEY, VAL_A);
        signalStorage.set(ISO_KEY, VAL_B);
        memoryStorage.remove(ISO_KEY);
        expect(memoryStorage.has(ISO_KEY)).toBe(false);
        expect(signalStorage.has(ISO_KEY)).toBe(true);
    });
});

describe('e2e: method alias consistency', () => {
    const ALIAS_KEY = 'alias_key';

    beforeEach(() => {
        memoryStorage.remove(ALIAS_KEY);
    });

    test('set and setItem produce the same stored value', () => {
        memoryStorage.set(ALIAS_KEY, 'via-set');
        const fromSet = memoryStorage.get(ALIAS_KEY);
        memoryStorage.removeItem(ALIAS_KEY);

        memoryStorage.setItem(ALIAS_KEY, 'via-setItem');
        const fromSetItem = memoryStorage.getItem(ALIAS_KEY);

        expect(fromSet).toEqual('via-set');
        expect(fromSetItem).toEqual('via-setItem');
    });

    test('has and hasItem return the same result', () => {
        memoryStorage.set(ALIAS_KEY, 'check');
        expect(memoryStorage.has(ALIAS_KEY)).toBe(memoryStorage.hasItem(ALIAS_KEY));
        memoryStorage.remove(ALIAS_KEY);
        expect(memoryStorage.has(ALIAS_KEY)).toBe(memoryStorage.hasItem(ALIAS_KEY));
    });

    test('remove and removeItem both delete the key in signalStorage', () => {
        signalStorage.set(ALIAS_KEY, 'a');
        signalStorage.remove(ALIAS_KEY);
        expect(signalStorage.has(ALIAS_KEY)).toBe(false);

        signalStorage.setItem(ALIAS_KEY, 'b');
        signalStorage.removeItem(ALIAS_KEY);
        expect(signalStorage.hasItem(ALIAS_KEY)).toBe(false);
    });
});

describe('e2e: serverStorage', () => {
    test('createServerStorage supports async CRUD lifecycle', async () => {
        const store = createServerStorage({
            namespace: 'e2e-server-crud',
            store: new Map(),
        });

        await store.remove(KEY);
        await store.set(KEY, OBJ_VAL);

        expect(await store.has(KEY)).toBe(true);
        expect(await store.get(KEY)).toEqual(OBJ_VAL);

        await store.remove(KEY);
        expect(await store.has(KEY)).toBe(false);
    });

    test('serverStorage aliases and clear stay consistent', async () => {
        const store = createServerStorage({
            namespace: 'e2e-server-aliases',
            store: new Map(),
        });

        await store.setItem(KEY, STR_VAL);
        expect(await store.getItem(KEY)).toEqual(STR_VAL);
        expect(await store.hasItem(KEY)).toBe(true);

        await store.clear();
        expect(await store.has(KEY)).toBe(false);
    });
});
