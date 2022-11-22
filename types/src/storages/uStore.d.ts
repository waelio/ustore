import { createApp } from "vue";
import { IUStoreClassInterface } from '../.d';
export declare const app: import("vue").App<Element>;
export { createApp };
export declare enum STATCSTORESNAMES {
    SERVER = "server",
    CLIENT = "client",
    DEV = "dev",
    PROD = "prod"
}
export declare type STATCSTORESTYPES = {
    SERVER: Partial<IUStoreClassInterface>;
    CLIENT: Partial<IUStoreClassInterface>;
    DEV: Partial<IUStoreClassInterface>;
    PROD: Partial<IUStoreClassInterface>;
};
export declare class IUStoreClass implements IUStoreClassInterface {
    [x: string]: {};
    _store: {};
    _storage?: any;
    constructor(plugin?: object, options?: any);
    set(key: string, value: object | string | number | boolean): any;
    setItem(key: string, value: object | string | number | boolean): any;
    getAll(): {};
    length(): number;
    getItem(key: string): any;
    get(key: string): any;
    remove(key: string): boolean;
    removeItem(key: string): boolean;
    client(): any;
    dev(): any;
    server(): any;
    store(): {};
    has(key: string): boolean;
    clear(): {};
    hasItem(key: string): boolean;
    buildNestedKey(nestedKey: string): {};
}
export declare const iStore: IUStoreClass;
export default iStore;
//# sourceMappingURL=uStore.d.ts.map