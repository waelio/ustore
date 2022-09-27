import { uStore } from '../index'

describe('Gun Storage', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().gun.set(label, payload)
  it('Gun Set & Get should match"', () => {
    expect(uStore().gun.get(label)).toEqual(payload);
  })
})