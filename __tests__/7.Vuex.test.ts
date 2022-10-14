import { uStore } from '../index'

test('Vuex Storage', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().vuex.set(label, payload)  
  expect(uStore().vuex.get(label)).toEqual(payload);  
})