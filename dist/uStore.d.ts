import { StoreTypes } from './types';
import { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, gunStorage, piniaStorage } from './stores/index';
declare const UniversalStore: (storePluginType?: StoreTypes) => import(".d").UniversalStoreClass;
export { UniversalStore as default, UniversalStore, localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage, StoreTypes };
