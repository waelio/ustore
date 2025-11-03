import { describe, expect, test, beforeEach } from '@jest/globals';
import { memoryStorage } from '../index';
import { uStore } from '../src/index';

// jest.mock('localforage'); 

const payload = 'Test Payload1';
const label = 'test';

describe('Memory Storage', () => {
  beforeEach(() => {
    // Remove potential leftovers before each test to avoid interference
    try { uStore.memory.removeItem(label); } catch { }
    try { memoryStorage.remove(label); } catch { }
  });

  describe('uStore.memory', () => {
    test('set & get', () => {
      uStore.memory.setItem(label, payload);
      expect(uStore.memory.getItem(label)).toEqual(payload);
    });
  });

  describe('memoryStorage', () => {
    test('set & get', () => {
      memoryStorage.setItem(label, payload);
      expect(memoryStorage.get(label)).toEqual(payload);//*?*/
    });
  });
});
