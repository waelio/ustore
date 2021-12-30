import 'core-js/stable'
import 'regenerator-runtime/runtime'
const { gunStorage } = require('../src/stores/gunStorage')

test('should have get/set functions', () => {
  expect(gunStorage.get).toBeTruthy()
  expect(gunStorage.set).toBeTruthy()
})

test('should set a value', async () => {
  const key = 'text'
  const value = 'test'
  await gunStorage.set(key, value)
  const rcv = gunStorage.get(key)
  console.log('rcv', rcv)
  expect(await rcv.toBe(value))
})
