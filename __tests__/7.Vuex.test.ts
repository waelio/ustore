import { describe, expect, test } from '@jest/globals';
import { uStore, vuexStorage } from '../index';

const payload = 'Test Payload1';
const label = 'test';

describe('Vuex Storage', () => {
  uStore.vuex.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.vuex.get()).toEqual(payload);
  });
  vuexStorage.set(label, payload);
  test('vuexStorage set & get', () => {
    expect(vuexStorage.get()).toEqual(payload);
  });
});
