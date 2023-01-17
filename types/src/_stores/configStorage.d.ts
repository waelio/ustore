import { IUStoreClassInterface } from "../.d";
export declare class Config {
    [x: string]: {};
    _store: Partial<IUStoreClassInterface>;
    constructor(plugin?: Partial<IUStoreClassInterface>, options?: any);
    getENV(): {};
    set(key: string, value: unknown): void;
    getAll(): Partial<IUStoreClassInterface>;
    getItem(key: string): any;
    get(key: string): any;
    client(): any;
    dev(): any;
    server(): any;
    store(): Partial<IUStoreClassInterface>;
    has(key: string): boolean;
    setEnvironment(): void;
    getServerVars(): {};
    getUrgentOverrides(): {};
    buildNestedKey(nestedKey: string): Partial<IUStoreClassInterface>;
}
export declare const configStorage: Config;
export type ConfigStorage = typeof configStorage;
declare const _default: Config;
export default _default;
//# sourceMappingURL=configStorage.d.ts.map