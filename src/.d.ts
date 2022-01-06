import { piniaStorage } from './stores/piniaStorage';
import { vuexStorage } from './stores/vuexStorage';
import { memoryStorage } from './stores/memoryStorage';
import { sessionStorage } from './stores/sessionStorage';
import { localStorage } from './stores/localStorage';
import { gunStorage } from './stores/gunStorage';
import { cookieStorage } from './stores/cookieStorage';
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
  getItem?: GetItem;
  get: GetItem;
  set: SetItem;
  remove?: RemoveItem;
}

export namespace globalThis {
  interface Window {
    localStorage: localStorage;
    sessionStorage: sessionStorage;
    memoryStorage: memoryStorage;
    vuexStorage: vuexStorage;
    piniaStorage: piniaStorage;
    gunStorage: gunStorage;
  }
}
