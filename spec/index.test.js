import {
  localStorage,
  sessionStorage,
  cookieStorage,
  memoryStorage,
  vuexStorage,
  gunStorage,
  piniaStorage
} from '../src/stores/index'

const testStores = [
  localStorage.default,
  sessionStorage.default,
  cookieStorage.default,
  memoryStorage.default,
  vuexStorage.default,
  gunStorage.default,
  piniaStorage.default
]

test('should be 7', () => {
  expect(testStores.length).toBe(7)
})
