/* globals describe, expect, it */
import path from 'path';

import UniversalStore from `${path.dirname}/../src/index`

console.log('UniversalStore', UniversalStore)

describe('UniversalStore must be an object', function () {
  it('Must be Object', function () {
    expect(UniversalStore).toBeTruthy()
  })
})
const testStore = new UniversalStore()
describe('UniversalStore must have a method called getStore', function () {
  it('Must be a function', function () {
    expect(testStore.get).toBeTruthy()
  })
})
