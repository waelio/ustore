import { test } from '@jest/globals';
import { uStore, gunStorage } from '../index';
jest.mock('localforage')

/**
 * Still testing this pickle ;)
 */
const payload = 'Test Payload1';
const label = 'test';

describe('Gun Storage', () => {
  test('uStore set & get', () => {
    uStore.gun.set(label, payload);
    const testMe = uStore.gun.get(label)
    setTimeout(() => {
      expect(testMe).toEqual(payload);
    }, 5000);
  });
  gunStorage.set(label, payload);
  test('gunStorage set & get', () => {
    gunStorage.set(label, payload);
    const t = gunStorage.get(label)
    setTimeout(() => {
      expect(t).toEqual(payload);
    }, 5000);

  });
});
