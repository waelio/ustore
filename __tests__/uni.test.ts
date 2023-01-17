import { describe, expect, test } from '@jest/globals';
import { UCORE } from "../src/core/index"

jest.mock('localforage')

const keys = ['client', 'client:dev'];
const payloads = ['Test Payload1', { 'test': 'payload test' }, 17, false];


describe('Core Test', () => {
  let safe = new UCORE()
  test(`UCORE set & get`, () => {
    keys.forEach(k => {
      payloads.forEach(p => {
        safe.setItem(k, p)
        // @ts-ignore
        expect(safe.getItem(k)).toEqual(p);
      });
    });
  })
});
