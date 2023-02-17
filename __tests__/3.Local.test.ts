import { describe, expect, test } from '@jest/globals';
import { uStore, localStorage } from '../index';
jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Local Storage', () => {
  uStore.local.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.local.get(label)).toEqual(payload);
  });
  localStorage.set(label, payload);
  test('localStorage set & get', () => {
    expect(localStorage.get(label)).toEqual(payload);
  });
});
