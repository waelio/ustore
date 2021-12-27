export enum StorePluginTypes {
  'localStorage' = 'localStorage',
  'sessionStorage' = 'sessionStorage',
  'memory' = 'memory',
  'vuex' = 'vuex',
  'pinia' = 'pinia',
  'gun' = 'gun'
}
export enum StoreTypes {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  memory = 'memoryStorage',
  vuex = 'vuexStorage',
  pinia = 'piniaStorage',
  gun = 'gunStorage'
}
export interface StoreOptions {
  type: string;
}
export interface GetItem {
  (key: string): string | object | string[] | object[] | null | boolean;
}
export interface SetItem {
  (key: string, value: string | object | string[] | object[]): void | boolean;
}
export interface RemoveItem {
  (key: string): void | boolean;
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
