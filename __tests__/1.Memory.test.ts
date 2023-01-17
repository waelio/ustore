import { describe, expect, test } from '@jest/globals';
import { memoryStorage } from '../src/_stores/memoryStorage';
import { uStore } from '../src/_stores/index';
jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Memory Storage', () => {
  uStore.memory.setItem(label, payload);
  test('uStore set & get', () => {
    expect(uStore.memory.getItem(label)).toEqual(payload);
  });
  //@ts-ignore
  memoryStorage.setItem( label, payload );

  test('memoryStorage set & get', () => {
    expect(memoryStorage.get(label)).toEqual({'test': payload});
  });
});
