import { UniversalStoreClass } from './.d';
import { StoreTypes } from './types';
import { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, gunStorage, piniaStorage } from './vendors';
export { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage };
export { StoreTypes };
export declare const UniversalStore: (storePluginType?: Partial<StoreTypes>) => UniversalStoreClass;
export default UniversalStore;
