import { describe, expect, test } from '@jest/globals';
import { uStore, vuexStorage } from '../index';
jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Vuex Storage', () => {
  // uStore.vuex.set(label, payload)
  // test('uStore set & get', () => {
  //   expect(uStore.vuex.getItem(label)).toEqual(payload);
  // });
  vuexStorage.set(label, payload);
  test('vuexStorage set & get', () => {
    expect(vuexStorage.get()).toEqual(payload);
  });
});
