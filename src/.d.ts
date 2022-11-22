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
  idb = "idbStorage",
  wsql = "wsqlStorage",
}
export interface IGet {
  (): () => string | object | string[] | object[];
}
export interface GetItem {
  (key: string): string | object | string[] | object[] | boolean;
}
export interface GetAll {
  (): object;
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
export interface IUStoreClassInterface {
  type?: IUStoreClassInterface;
  _storage?: Storage;
  get: GetItem;
  set: SetItem;
  setItem: SetItem;
  getItem: GetItem;
  getAll: GetAll;
  hasItem: HasItem;
  removeItem: RemoveItem;
  remove: RemoveItem;
  has: HasItem;
}
type ValueType = {};
type OptionsFlags<Type> = {
  [Property in keyof Type]: Property;
};
export interface uStore {
  [x: string]: unknown;
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

declare module "pinia" {
  export interface MapStoresCustomization {
    // set it to the same value as above
    suffix: "";
  }
}
