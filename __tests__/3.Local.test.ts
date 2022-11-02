import { uStore } from '../index';

test.only('Local Storage', () => {
  const payload = 'Test Payload1';
  const label = 'test';
  uStore.local.set(label, payload);
  if (typeof window !== 'undefined') {
    expect(uStore.local.get(label)).toEqual(payload);
  }
});
