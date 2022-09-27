import { uStore } from '../index'

describe('Local Storage', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().local.set(label, payload)
  it('Local Set & Get should match"', () => {
    expect(uStore().local.get(label)).toEqual(payload);
  })
})