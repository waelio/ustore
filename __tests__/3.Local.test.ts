import { uStore, localStorage } from '../index';


describe('Local Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.local.set(label, payload);

  test('uStore set & get', () => {
    expect(uStore.local.get(label)).toEqual(payload);
  });
  localStorage.set(label, payload);
  test('localStorage set & get', () => {
    expect(localStorage.get(label)).toEqual(payload);
  });
});
