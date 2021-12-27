import { localStorage } from './vendors/localStorage';
import { sessionStorage } from './vendors/sessionStorage';
import { memoryStorage } from './vendors/memoryStorage';
import { vuexStorage } from './vendors/vuexStorage';
import { piniaStorage } from './vendors/piniaStorage';
import { gunStorage } from './vendors/gunStorage';
import { StoreTypes, StorePluginTypes, UniversalStoreClass } from './.d';

const initialStore = StoreTypes.localStorage;
export const UniversalStore = (
  storePluginType: Partial<StoreTypes> = initialStore
): UniversalStoreClass => {
  switch (storePluginType) {
    case StoreTypes.localStorage:
      return localStorage;
    case StoreTypes.sessionStorage:
      return sessionStorage;
    case StoreTypes.memory:
      return memoryStorage;
    case StoreTypes.vuex:
      return vuexStorage;
    case StoreTypes.pinia:
      return piniaStorage;
    case StoreTypes.gun:
      return gunStorage;
    default:
      return localStorage;
  }
};
var test = UniversalStore(StoreTypes.localStorage);
test; /*?*/
