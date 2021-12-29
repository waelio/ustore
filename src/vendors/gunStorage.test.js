const { gunStorage } = require('./gunStorage')

test('gunStorage has a get function', () => {
  expect(gunStorage.get).toBeTruthy()
})
