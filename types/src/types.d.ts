export declare enum StoreTypes {
    local = "localStorage",
    session = "sessionStorage",
    cookie = "cookieStorage",
    memory = "memoryStorage",
    vuex = "vuexStorage",
    pinia = "piniaStorage",
    gun = "gunStorage",
    solid = "solidStorage"
}
export interface StoreOptions {
    type?: string;
}
export declare enum StorePlugins {
    local = "localStorage",
    session = "sessionStorage",
    cookie = "cookieStorage",
    memory = "memoryStorage",
    vuex = "vuexStorage",
    pinia = "piniaStorage",
    gun = "gunStorage",
    solid = "solidStorage"
}
export interface GetItem {
    (key: string): string | object | string[] | object[] | null | boolean;
}
export interface HasItem {
    (key: string): string | object | string[] | object[] | null | boolean;
}
export interface SetItem {
    (key: string, value: string | object | string[] | object[]): void | any;
}
export interface RemoveItem {
    (key: string): void | any;
}
export interface UStoreClass {
    type?: string;
    _storage?: Storage;
    getItem?: GetItem;
    get: GetItem;
    set: SetItem;
    remove?: RemoveItem;
}
export interface UStoreClassFunc {
    get: GetItem;
    getItem: GetItem;
    set: SetItem;
    setItem: SetItem;
    has: HasItem;
    hasItem: HasItem;
    remove: RemoveItem;
    removeItem: RemoveItem;
}
//# sourceMappingURL=types.d.ts.map