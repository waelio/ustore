import { uStore } from '../index'
if (window && typeof window !== undefined) {
  test('Cookie Storage', () => {
    const payload = 'Test Payload1'
    const label = "test"
    uStore().cookie.set(label, payload)  
    expect(uStore().cookie.get(label)).toEqual(payload);  
  })
  
}