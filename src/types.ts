export enum StoreTypes {
  local = "localStorage",
  session = "sessionStorage",
  cookie = "cookieStorage",
  memory = "memoryStorage",
  vuex = "vuexStorage",
  pinia = "piniaStorage",
  gun = "gunStorage",
}
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
export interface SetItem {
  (key: string, value: string | object | string[] | object[]): void | any;
}
export interface RemoveItem {
  (key: string): void | any;
}
