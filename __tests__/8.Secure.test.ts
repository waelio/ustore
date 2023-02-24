import { describe, expect, test } from '@jest/globals';
import { uStore, secureStorage } from '../index';
jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';
const options = { salt: 'ustore-salt'}

describe('Secure Storage', () => {
  uStore.secure.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.secure.getItem(label)).toEqual(payload);
  });
  test('uStore set & get', () => {
    uStore.secure.set(label, payload, options);
    expect(uStore.secure.getItem(label, options)).toEqual(payload);
  });
  test('secureStorage set & get', () => {
    secureStorage.set(label, payload);
    expect(secureStorage.getItem(label)).toEqual(payload);
  });
  test('secureStorage set & get', () => {
    secureStorage.set(label, payload, options);
    expect(secureStorage.getItem(label, options)).toEqual(payload);
  });
});
