import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    get: () => any
    addItem: (key, value) => void
    setItem: (key, value) => void
    remove: (key) => void
  }
}