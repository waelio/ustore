import { describe, expect, test } from '@jest/globals';
import { configStorage , uStore } from '../index';

const payload = 'Test Payload1';
const label = 'test';

describe('uStore Storage', () => {
  uStore.config.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.config.getItem(label)).toEqual(payload);
  });
  configStorage.set(label, payload);
  test('configStorage set & get', () => {
    expect(configStorage.get(label)).toEqual(payload);
  });
});
