import { describe, expect, test } from '@jest/globals';
import { uStore, piniaStorage } from '../index';

const payload = 'Test Payload1';
const label = 'test';

describe('Pinia Storage', () => {
  uStore.pinia.set(payload);
  test('pinia set & get', () => {
    expect(uStore.pinia.get()).toEqual(payload);
  });
  piniaStorage.set(payload);
  test('piniaStorage set & get', () => {
    expect(piniaStorage.get()).toEqual(payload);
  });
});
