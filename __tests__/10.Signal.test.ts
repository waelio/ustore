import { signalStorage, uStore } from '../index'

jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Signal Storage', () => {
  test('uStore set & get', () => {
    const test = uStore.signal.set(label, payload)
    expect(test).toEqual(payload[label]);
  });

  test('signalStorage set & get', () => {
    const tset = signalStorage.set(label, payload);
    expect(tset).toEqual(payload[label]);
  });
});