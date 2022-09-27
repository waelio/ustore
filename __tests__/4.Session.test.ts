import { uStore } from '../index'

describe('uStore', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().session.set(label, payload)
  it('Session Set & Get should match"', () => {
    expect(uStore().session.get(label)).toEqual(payload);
  })
})