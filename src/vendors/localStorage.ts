import { UniversalStoreClass } from '../types';

export const localStorage: UniversalStoreClass = {
  get: (key: string) => {
    try {
      return window.localStorage.getItem(key) || null;
    } catch (error: any) {
      return error.message ? error.message : error;
    }
  },
  set: (key: string, value: any) => {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error: any) {
      return error.message ? error.message : error;
    }
  },
  remove: (key: string) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error: any) {
      return error.message ? error.message : error;
    }
  }
};
