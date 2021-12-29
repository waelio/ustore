import { UniversalStoreClass } from '../.d';

export const vuexStorage: UniversalStoreClass = {
  get: (key: string) => state.storage[key],
  set: (key: string, value: any) => {
    store.commit('setStorage', { key, value });
    return true;
  }
};
