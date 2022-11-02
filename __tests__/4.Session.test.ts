import { uStore, sessionStorage } from '../index';

describe('Session Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.session.set(label, payload);

  test('uStore set & get', () => {
    expect(uStore.session.get(label)).toEqual(payload);
  });
  sessionStorage.set(label, payload);
  test('sessionStorage set & get', () => {
    expect(sessionStorage.get(label)).toEqual(payload);
  });
});
