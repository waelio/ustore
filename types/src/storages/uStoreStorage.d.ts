import { createApp } from "vue";
import { IUStoreClassInterface } from "../.d";
export declare const app: import("vue").App<Element>;
export { createApp };
export declare enum STATCSTORESNAMES {
    SERVER = "server",
    CLIENT = "client",
    DEV = "dev",
    PROD = "prod"
}
export type STATCSTORESTYPES = {
    SERVER: Partial<IUStoreClassInterface>;
    CLIENT: Partial<IUStoreClassInterface>;
    DEV: Partial<IUStoreClassInterface>;
    PROD: Partial<IUStoreClassInterface>;
};
export declare class IUStoreClass implements IUStoreClassInterface {
    [x: string]: {};
    _store: any;
    _storage?: any;
    constructor(plugin?: object, options?: any);
    set(key: string, value: object | string | number | boolean): any;
    setItem(key: string, value: object | string | number | boolean): any;
    getAll(): any;
    length(): number;
    getItem(key: string): any;
    get(key: string): any;
    remove(key: string): boolean;
    removeItem(key: string): boolean;
    client(): any;
    dev(): any;
    server(): any;
    store(): any;
    has(key: string): boolean;
    clear(): {};
    hasItem(key: string): boolean;
    buildNestedKey(nestedKey: string): any;
}
export declare const uStoreStorage: IUStoreClass;
export default uStoreStorage;
//# sourceMappingURL=uStoreStorage.d.ts.map