import { uStore } from '../index';

test('Memory Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.secure.set(label, payload);
  expect(uStore.secure.getItem(label)).toEqual(payload);
});
