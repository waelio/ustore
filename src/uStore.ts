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
} from './stores/index';

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

export const initialStore = StoreTypes.local;
interface _storeOptions {
  plugin?: StoreTypes;
}
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

// export function uStore(
//   storePluginType: Partial<StoreTypes> = initialStore
// ): UniversalStoreClass {
//   switch (storePluginType) {
//     case StoreTypes.local:
//       return localStorage;
//     case StoreTypes.session:
//       return sessionStorage;
//     case StoreTypes.cookie:
//       return cookieStorage;

//     case StoreTypes.memory:
//       return memoryStorage;
//     case StoreTypes.vuex:
//       return vuexStorage;
//     case StoreTypes.pinia:
//       return piniaStorage;
//     case StoreTypes.gun:
//       return gunStorage;
//     default:
//       return localStorage;
//   }
// }
export default uStore;
