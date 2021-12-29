const { cookieStorage } = require('./cookieStorage')

test('cookieStoage has a get function', () => {
  expect(cookieStorage.get).toBeTruthy()
})
