const { localStorage } = require('../src/stores/localStorage')

test('localStorage has a get function', () => {
  expect(localStorage.get).toBeTruthy()
})
