const { localStorage } = require('./localStorage')

test('localStorage has a get function', () => {
  expect(localStorage.get).toBeTruthy()
})
