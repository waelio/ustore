import { UniversalStoreClass } from '../types';
export const vuexStorage: UniversalStoreClass = {
  get: (key: string) => state.storage[key],
  set: (key: string, value: any) => {
    store.commit('setStorage', { key, value });
    return true;
  }
};
