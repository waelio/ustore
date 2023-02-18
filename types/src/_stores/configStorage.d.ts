import { UStoreClass } from "../.d";
export declare const isProcess: () => unknown | boolean;
export declare class Config {
    [x: string]: {};
    _store: Partial<UStoreClass>;
    constructor();
    set(key: string, value: unknown): void;
    getAll(): Partial<UStoreClass>;
    getItem(key: string): any;
    get(key: string): any;
    client(): any;
    dev(): any;
    server(): any;
    store(): Partial<UStoreClass>;
    has(key: string): boolean;
    setEnvironment(): void;
    getServerVars(): {};
    getClientVars(): {};
    getUrgentOverrides(): {};
    buildNestedKey(nestedKey: string): Partial<UStoreClass>;
}
export type ConfigStorage = typeof configStorage;
declare const configStorage: Config;
export { configStorage };
declare const _default: Config;
export default _default;
//# sourceMappingURL=configStorage.d.ts.map