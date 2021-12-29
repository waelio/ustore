import { cookieStorage } from './vendors/cookieStorage';
export enum StorePluginTypes {
  'local' = 'localStorage',
  'session' = 'sessionStorage',
  'cookie' = 'cookieStorage',
  'memory' = 'memory',
  'vuex' = 'vuex',
  'pinia' = 'pinia',
  'gun' = 'gun'
}

export interface StoreOptions {
  type: string;
}
export interface GetItem {
  (key: string): string | object | string[] | object[] | null | boolean;
}
export interface SetItem {
  (key: string, value: string | object | string[] | object[]): void | any;
}
export interface RemoveItem {
  (key: string): void | any;
}
export interface UniversalStoreClass {
  type?: string;
  _storage?: Storage;
  get: GetItem;
  set: SetItem;
  remove?: RemoveItem;
}

export namespace globalThis {
  interface Window {
    localStorage: UniversalStoreClass;
    sessionStorage: UniversalStoreClass;
    memoryStorage: UniversalStoreClass;
    vuexStorage: UniversalStoreClass;
    piniaStorage: UniversalStoreClass;
    gunStorage: UniversalStoreClass;
  }
}
