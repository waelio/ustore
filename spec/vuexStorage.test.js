const { vuexStorage } = require('../src/stores/vuexStorage')

test('vuexStorage has a get function', () => {
  expect(vuexStorage.get).toBeTruthy()
})

test('vuexStorage has a set function', () => {
  expect(vuexStorage.set).toBeTruthy()
})

test('vuexStorage can set and get a sring', () => {
  vuexStorage.set('test', 'test')
  expect(vuexStorage.get('test')).toBe('test')
})

test('vuexStorage can set and get an object', () => {
  vuexStorage.set('test', { key: 'value' })
  expect(vuexStorage.get('test')).toEqual({ key: 'value' })
})
