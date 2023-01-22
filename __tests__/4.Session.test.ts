import { describe, expect, test } from '@jest/globals';
import { uStore, sessionStorage } from '../index';
jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Session Storage', () => {
  uStore.session.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.session.getItem(label)).toBe(payload);
  });
  sessionStorage.set(label, payload);
  test('sessionStorage set & get', () => {
    expect(sessionStorage.getItem(label)).toBe(payload);
  });
});
