import { uStore } from '../index'

test('Gun Storage', async() => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().gun.get(label).set(label, payload)
  it('Gun Set & Get should match"', () => {
    expect(uStore().gun.get(label)).toEqual(payload);
  })
})