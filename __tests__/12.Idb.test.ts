import { idbStorage, uStore } from '../index'

jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Idb Storage', () => {
  test('uStore set & get', async () => {
    await uStore.idb.set(label, payload);
    const result = await uStore.idb.get(label);
    expect(result).toBeDefined();
  });

  test('idbStorage set & get', async () => {
    await idbStorage.set(label, payload);
    const result = await idbStorage.get(label);
    expect(result).toBeDefined();
  });
});
