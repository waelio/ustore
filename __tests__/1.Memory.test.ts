import { describe, expect, test } from '@jest/globals';
import { uStore, memoryStorage } from '../index';

const payload = 'Test Payload1';
const label = 'test';

describe('Memory Storage', () => {
  uStore.memory.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.memory.get(label)).toEqual(payload);
  });
  memoryStorage.set(label, payload);
  test('memoryStorage set & get', () => {
    expect(memoryStorage.get(label)).toEqual(payload);
  });
});
