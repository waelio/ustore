// @ts-ignore @ts-expect-error
import { describe, expect, test } from '@jest/globals';
import { uStore, piniaStorage } from '../index';
jest.mock('localforage')
const payload = "Test Payload1";
const label = "test";

describe('Pinia Storage', () => {
  uStore.pinia.setItem(label, payload);
  test('pinia set & get', () => {
    expect(uStore.pinia.get(label)).toBeTruthy();
  });
  piniaStorage.setItem(label, payload);
  test('piniaStorage set & get', () => {
    expect(piniaStorage.getItem(label)).toBeTruthy();
  });
});
