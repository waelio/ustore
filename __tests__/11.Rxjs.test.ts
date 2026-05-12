import { rxjsStorage, uStore } from '../index'

jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

describe('Rxjs Storage', () => {
  test('uStore set & get', () => {
    uStore.rxjs.set(label, payload);
    const result = uStore.rxjs.get(label);
    expect(result).toEqual(payload);
  });

  test('rxjsStorage set & get', () => {
    rxjsStorage.set(label, payload);
    const result = rxjsStorage.get(label);
    expect(result).toEqual(payload);
  });
});
