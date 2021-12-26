import { UniversalStoreClass } from '../types';

export const piniaStorage: UniversalStoreClass = {
  get: (key: string) => window.localStorage.getItem(key),
  set: (key: string, value: any) => window.localStorage.setItem(key, value),
}
