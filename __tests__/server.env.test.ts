/**
 * @jest-environment node
 */
import { describe, expect, test } from '@jest/globals';
import { uStore, cookieStorage, localStorage, sessionStorage, memoryStorage, configStorage, signalStorage, gunStorage } from '../index';

const label = 'svrKey';
const payload = 'Svr Payload';

describe('Server environment behavior (Node)', () => {
    test('cookieStorage in server uses memory fallback and returns key=value', () => {
        uStore.cookie.set(label, payload);
        expect(uStore.cookie.get(label)).toEqual(`${label}=${payload}`);

        cookieStorage.set(label, payload);
        expect(cookieStorage.get(label)).toEqual(`${label}=${payload}`);
        expect(cookieStorage.has(label)).toBe(true);
        cookieStorage.remove(label);
        expect(cookieStorage.has(label)).toBe(false);
    });

    test('localStorage works in Node via store2 memory fallback', () => {
        uStore.local.set(label, payload);
        expect(uStore.local.get(label)).toEqual(payload);

        localStorage.set(label, payload);
        expect(localStorage.get(label)).toEqual(payload);
    });

    test('sessionStorage works in Node via store2 session memory', () => {
        uStore.session.set(label, payload);
        expect(uStore.session.get(label)).toEqual(payload);

        sessionStorage.set(label, payload);
        expect(sessionStorage.get(label)).toEqual(payload);
    });

    test('memoryStorage works in Node', () => {
        memoryStorage.set(label, payload);
        expect(memoryStorage.get(label)).toEqual(payload);
        memoryStorage.remove(label);
        expect(memoryStorage.has(label)).toBe(false);
    });

    test('configStorage reports server environment shape', () => {
        // should not throw and should return an object for server/client/dev buckets
        expect(typeof configStorage.server()).toBe('object');
        expect(typeof configStorage.client()).toBe('object');
        expect(typeof configStorage.dev()).toBe('object');
    });

    test('signalStorage basic set/get in Node', () => {
        const result = signalStorage.set(label, payload);
        // Current contract: set returns value[label] when value is an object; for primitives it's undefined.
        expect(signalStorage.get(label)).toBe(payload);
        expect(signalStorage.has(label)).toBe(true);
        signalStorage.remove(label);
        expect(signalStorage.has(label)).toBe(false);
    });

    test('gunStorage is available (no network call required)', () => {
        expect(typeof gunStorage.get).toBe('function');
        expect(typeof gunStorage.set).toBe('function');
    });
});
