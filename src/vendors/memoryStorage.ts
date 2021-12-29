import { UniversalStoreClass } from '../.d';
let memoryStore = {};

export const memoryStorage: UniversalStoreClass = {
  get: (key: string) => memoryStore[key],
  set: (key: string, value: any) => {
    memoryStore[key] = value;
    return true;
  },
  remove: (key: string) => {
    delete memoryStore[key];
    return true;
  }
};
