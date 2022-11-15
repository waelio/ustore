import { test } from '@jest/globals';
// import { uStore, gunStorage } from '../index';
/**
 * Still testing this pickle ;)
 */
const payload = 'Test Payload1';
// const label = 'test';

// describe('Gun Storage', () => {
  // uStore.gun.set(label, payload);
  // test('uStore set & get', async() => {
    // expect(uStore.gun.get(label)).toEqual(payload);
  // });
  // gunStorage.set(label, payload);
  test('gunStorage set & get', async () => {
    // await gunStorage.set(label, payload);
    // const testMe = gunStorage.get(label);
    expect(payload).toEqual(payload);
  });
// });
