import { UStoreClass } from "../.d";
export declare class Config {
    [x: string]: any;
    _store: UStoreClass;
    constructor();
    set(key: string, value: any): void;
    getAll(): UStoreClass;
    getItem(key: string): any;
    get(key: string): any;
    client(): any;
    dev(): any;
    server(): any;
    store(): UStoreClass;
    has(key: string): boolean;
    setEnvironment(): void;
    getServerVars(): {};
    getClientVars(): Promise<typeof import("../config/client")> | undefined;
    getUrgentOverrides(): {};
    buildNestedKey(nestedKey: string): UStoreClass;
}
export declare type ConfigStorage = typeof configStorage;
export declare const configStorage: Config;
declare const _default: Config;
export default _default;
//# sourceMappingURL=configStorage.d.ts.map