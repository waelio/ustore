// @ts-ignore @ts-expect-error
import { describe, expect, test } from '@jest/globals';
import { uStore, piniaStorage } from '../index';
jest.mock('localforage')

const payload = "Test Payload1";
const label = "test";

describe('Pinia Storage', () => {
  test('pinia set & get', () => {
    uStore.pinia.set(payload);
    expect(uStore.pinia.get()).toBeTruthy();
    expect(uStore.pinia.get()).toEqual(payload)
  });
  test('piniaStorage set & get', () => {
    piniaStorage.set(payload);
    expect(piniaStorage.get()).toBeTruthy();
    expect(uStore.pinia.get()).toEqual(payload)
  });
});
