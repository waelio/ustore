const { cookieStorage } = require('../src/stores/cookieStorage')

test('cookieStoage has a get function', () => {
  expect(cookieStorage.get).toBeTruthy()
})
