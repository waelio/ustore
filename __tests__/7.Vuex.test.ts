import { uStore } from '../index'

describe('Vuex Storage', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().vuex.set(label, payload)
  it('Vuex Set & Get should match"', () => {
    expect(uStore().vuex.get(label)).toEqual(payload);
  })
})