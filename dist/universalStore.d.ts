import { UniversalStoreClass } from './.d';
import { StoreTypes } from './types';
import { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, gunStorage, piniaStorage } from './stores/index';
export { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage };
export { StoreTypes };
export declare const UniversalStore: (storePluginType?: Partial<StoreTypes>) => UniversalStoreClass;
export default UniversalStore;
