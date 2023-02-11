import { describe, expect, test } from '@jest/globals';
import { memoryStorage } from '../index'
import { uStore } from '../src/index';


const payload = 'Test Payload1';
const label = 'test';

describe('Memory Storage', () => {
  uStore.memory.setItem(label, payload);
  test('uStore set & get', () => {
    expect(uStore.memory.getItem(label)).toEqual(payload);
  });
  //@ts-ignore
  memoryStorage.setItem(label, payload);

  test('memoryStorage set & get', () => {
    expect(memoryStorage.get(label)).toEqual(payload);
  });
});
