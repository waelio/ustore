import { UStoreClass } from "../.d";
export declare class Config {
    configPath: string;
    [x: string]: {} | Promise<unknown> | Promise<string> | Promise<Function>;
    _store: Partial<UStoreClass>;
    constructor();
    isProcess(): unknown;
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
    getServerVars(): Promise<string[] | undefined>;
    getClientVars(): Promise<any>;
    getUrgentOverrides(): {};
    buildNestedKey(nestedKey: string): Partial<UStoreClass>;
}
export declare type ConfigStorage = typeof configStorage;
export declare const configStorage: Config;
declare const _default: Config;
export default _default;
//# sourceMappingURL=configStorage.d.ts.map