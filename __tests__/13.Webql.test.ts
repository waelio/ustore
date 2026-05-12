import { webqlStorage, uStore } from '../index'

jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Webql Storage', () => {
  test('uStore set & get', async () => {
    await uStore.webql.set(label, payload);
    const result = await uStore.webql.get(label);
    expect(result).toBeDefined();
  });

  test('webqlStorage set & get', async () => {
    await webqlStorage.set(label, payload);
    const result = await webqlStorage.get(label);
    expect(result).toBeDefined();
  });
});
