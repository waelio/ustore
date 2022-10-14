import { uStore } from '../index'

test('Cookie Storage', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().cookie.set(label, payload)
  it('Cookie Set & Get should match"', () => {
    expect(uStore().cookie.get(label)).toEqual(payload);
  })
})