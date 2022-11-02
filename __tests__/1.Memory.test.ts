import { uStore } from '../index';

describe('Memory Stotage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.memory.set(label, payload);
  test('set & get', () => {
    expect(uStore.memory.get(label)).toEqual(payload);
  })
});
