import { uStore, secureStorage } from '../index';

describe('Secure Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.secure.set(label, payload);
  test('uStore set & get', () => {
    expect(uStore.secure.getItem(label)).toEqual(payload);
  });
  secureStorage.set(label, payload);
  test('secureStorage set & get', () => {
    expect(secureStorage.getItem(label)).toEqual(payload);
  });
});
