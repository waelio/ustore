import { UniversalStoreClass } from './.d';
import { StoreTypes } from './types';
import { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, gunStorage, piniaStorage } from './stores/';
export { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage };
export { StoreTypes };
export declare const uStore: (options: _storeOptions) => UniversalStoreClass;
export default uStore;
