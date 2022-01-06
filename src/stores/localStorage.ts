import { UniversalStoreClass } from '../.d';

export const localStorage: UniversalStoreClass = {
  get: (key: string) => {
    try {
      return window.localStorage.getItem(key);
    } catch (error: any) {
      return error || null;
    }
  },
  set: (key: string, value: any) => {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error: any) {
      return error || null;
    }
  },
  remove: (key: string) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error: any) {
      return error || null;
    }
  }
};
