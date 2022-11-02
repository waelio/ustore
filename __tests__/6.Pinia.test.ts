import { uStore } from '../index';

test('Pinia Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.pinia.set(label, payload);

  expect(uStore.pinia.get(label)).toEqual({ test: payload });
});
