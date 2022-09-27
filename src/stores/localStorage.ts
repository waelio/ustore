import store from 'store2'
import { UStoreClass } from '../.d';
const local = store.local.namespace('uStore')

export const localStorage: UStoreClass = {
  get: (key: string) => {
    try {
      return local(key);
    } catch (error: any) {
      return error || null;
    }
  },
  set: (key: string, value: any) => {
    try {
      return local(key, value);
    } catch (error: any) {
      return error || null;
    }
  },
  remove: (key: string) => {
    try {
      return local.remove(key);
    } catch (error: any) {
      return error || null;
    }
  }
};
export default localStorage