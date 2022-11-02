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
export interface GetItem {
  (key: string): string | object | string[] | object[] | null | boolean;
}
export interface GetAll {
  (key: string): object;
}
export interface HasItem {
  (key: string): boolean | string;
}
export interface SetItem {
  (key: string, value: string | object | string[] | object[]):
    | void
    | string
    | Promise<unknown>
    | unknown
    | [];
}
export interface RemoveItem {
  (key: string): void | any;
}
export interface UStoreClass {
  type?: string;
  _storage?: Storage;
  get: GetItem;
  set: SetItem;
  remove?: RemoveItem;
  has?: boolean;
}
type ValueType = {};
type OptionsFlags<Type> = {
  [Property in keyof Type]: Property;
};
export interface uStore {
  type?: string;
  _storage?: Storage;
  getItem: GetItem;
  getAll?: object;
  get: GetItem;
  set: SetItem;
  remove?: RemoveItem;
  has: HasItem;
  hasItem?: HasItem;
}
