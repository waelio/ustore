import { uStore, idbStorage } from '../index';

describe('Idb storage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.idb.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.idb.getItem(label)).toEqual(payload);
  });
  idbStorage.set(label, payload);
  test('idbStorage set & get', () => {
    expect(idbStorage.getItem(label)).toEqual(payload);
  });
});