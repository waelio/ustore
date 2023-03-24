export interface StoreOptions {
  type?: string;
}
export enum StorePlugins {
  local = "localStorage",
  session = "sessionStorage",
  cookie = "cookieStorage",
  memory = "memoryStorage",
  vuex = "vuexStorage",
  pinia = "piniaStorage",
  gun = "gunStorage",
}
export type SecureOptions = {
  salt: string;
};
export interface GetItem {
  (key: string): string | object | string[] | object[] | boolean;
}
export interface GetItemSecure {
  (key: string, options?: SecureOptions):
    | string
    | object
    | string[]
    | object[]
    | boolean;
}
export interface GetAll {
  (key: string): object;
}
export interface HasItem {
  (key: string): boolean | any;
}
export interface SetItem {
  (key: string, value: string | object | string[] | object[]):
    | void
    | string
    | Promise<unknown>
    | unknown
    | [];
}
export interface SetItemSecure {
  (
    key: string,
    value: string | object | string[] | object[],
    options?: SecureOptions
  ): void | string | Promise<unknown> | unknown | [];
}
export interface RemoveItem {
  (key: string): void | any;
}
export interface UStoreClass {
  type?: string;
  _storage?: Storage;
  get: GetItem;
  getItem: GetItem;
  set: SetItem;
  setItem: SetItem;
  remove: RemoveItem;
  removeItem: RemoveItem;
  has: HasItem;
  hasItem: HasItem;
}
type ValueType = {};
type OptionsFlags<Type> = {
  [Property in keyof Type]: Property;
};
export interface uStore {
  [x: string]: unknown;
  type?: string;
  _storage?: Storage;
  getAll?: object;
  get: GetItem;
  getItem: GetItem;
  set: SetItem;
  setItem: SetItem;
  remove: RemoveItem;
  removeItem: RemoveItem;
  has: HasItem;
  hasItem: HasItem;
}
export interface uStoreSecure {
  [x: string]: any;
  type?: string;
  _storage?: Storage;
  getAll?: object;
  get: GetItem;
  getItem: GetItemSecure;
  set: SetItemSecure;
  setItem: SetItemSecure;
  remove: RemoveItem;
  removeItem: RemoveItem;
  has: HasItem;
  hasItem: HasItem;
}
