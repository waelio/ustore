import { describe, expect, test } from '@jest/globals';
import { uStore, cookieStorage } from '../src/_stores/index';
jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Cookie Storage', () => {
  uStore.cookie.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.cookie.get(label)).toEqual(`${label}=${payload}`);
  });
  cookieStorage.set(label, payload);
  test('cookieStorage set & get', () => {
    expect(cookieStorage.get(label)).toEqual(`${label}=${payload}`);
  });
});
