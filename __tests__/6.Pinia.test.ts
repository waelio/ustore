// import { describe, expect, test } from '@jest/globals';
// import { uStore, piniaStorage } from '../index';
// jest.mock('localforage')

// const payload = "Test Payload1";
// const label = "test";

// describe('Pinia Storage', () => {
//   test('pinia set & get', () => {
//     uStore.pinia.set(payload);
//     expect(uStore.pinia.get()).toBeTruthy();
//     expect(uStore.pinia.get()).toEqual(payload)
//   });
//   test('piniaStorage set & get', () => {
//     piniaStorage.set(payload);
//     expect(piniaStorage.get()).toBeTruthy();
//     expect(uStore.pinia.get()).toEqual(payload)
//   });
// });


import { describe, expect, test } from '@jest/globals';
import { piniaStorage } from '../index'
import { uStore } from '../src/index';

jest.mock('localforage')


const payload = 'Test Payload1';
const label = 'test';

describe('Memory Storage', () => {
  uStore.memory.setItem(label, payload);
  test('uStore set & get', () => {
    expect(uStore.memory.getItem(label)).toEqual(payload);
  });
  //@ts-ignore
  piniaStorage.setItem(label, payload);

  test('piniaStorage set & get', () => {
    expect(piniaStorage.get(label)).toEqual(payload);
  });
});
