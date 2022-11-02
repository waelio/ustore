import { uStore, piniaStorage } from '../index';

describe('Vuex Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.pinia.set( payload);
  test('pinia set & get', () => {
    expect(uStore.pinia.get()).toEqual(payload);
  });
  piniaStorage.set(payload);
  test('piniaStorage set & get', () => {
    expect(piniaStorage.get()).toEqual(payload);
  });
});
