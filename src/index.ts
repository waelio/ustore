import { UniversalStoreClass } from './.d';
import { StoreTypes } from './types';
import {
  localStorage,
  sessionStorage,
  cookieStorage,
  memoryStorage,
  vuexStorage,
  gunStorage,
  piniaStorage
} from './stores/';

export {
  localStorage,
  sessionStorage,
  cookieStorage,
  memoryStorage,
  vuexStorage,
  piniaStorage,
  gunStorage
};

export { StoreTypes };

const initialStore = StoreTypes.local;

export const uStore = (options: _storeOptions): UniversalStoreClass => {
  const { plugin } = options;
  if (!plugin) options.plugin = initialStore;
  return plugin === 'cookieStorage'
    ? cookieStorage
    : localStorage
    ? localStorage
    : sessionStorage
    ? sessionStorage
    : memoryStorage
    ? memoryStorage
    : vuexStorage
    ? vuexStorage
    : piniaStorage
    ? piniaStorage
    : gunStorage
    ? gunStorage
    : cookieStorage;
};
export default uStore;
