import { uStore } from '../index'

test('uStore', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().session.set(label, payload)
  it('Session Set & Get should match"', () => {
    expect(uStore().session.get(label)).toEqual(payload);
  })
})