import { uStore } from '../index'
if (typeof window !== undefined) {
  const payload = 'Test Payload1'
  const label = "label"
  test('Cookie Storage', () => {
    uStore.cookie.set('label', payload)  
    expect(uStore.cookie.get('label')).toEqual(`${label}=${payload}`)
  })
  
}