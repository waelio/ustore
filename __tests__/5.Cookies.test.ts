import { uStore, cookieStorage } from '../index';

describe('Cookie Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.cookie.set(label, payload);

  test('uStore set & get', () => {
    expect(uStore.cookie.get(label)).toEqual(`${label}=${payload}`);
  });
  cookieStorage.set(label, payload);
  test('cookieStorage set & get', () => {
    expect(cookieStorage.get(label)).toEqual(`${label}=${payload}`);
  });
});
