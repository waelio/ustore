export enum StoreTypes {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  memory = 'memory',
  vuex = 'vuex',
  pinia = 'pinia',
  gun = 'gun'
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
  StoreType?: string;
  get: GetItem;
  set: SetItem;
  remove?: RemoveItem;
}
namespace globalThis {
  interface Window {
    localStorage: UniversalStoreClass;
    sessionStorage: UniversalStoreClass;
    memoryStorage: UniversalStoreClass;
    vuexStorage: UniversalStoreClass;
    piniaStorage: UniversalStoreClass;
    gunStorage: UniversalStoreClass;
  }
}
