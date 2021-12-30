import { UniversalStoreClass } from '../.d';

export const sessionStorage: UniversalStoreClass = {
  get: (key: string) => window.sessionStorage.getItem(key),
  set: (key: string, value: any) => window.sessionStorage.setItem(key, value),
  remove: (key: string) => window.sessionStorage.removeItem(key)
};
