import { uStore } from '../index'

test('Pinia Stotage', () => {
  const payload = 'Test Payload1'
  const label = "test"
  uStore().pinia.set(label, payload)
  it('Pinia Set & Get should match"', () => {
    expect(uStore().pinia.get(label)).toEqual(payload);
  })
})