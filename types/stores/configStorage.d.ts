import { UStoreClass } from "../.d";
declare class Config {
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
    getClientVars(): {
        [key: string]: any;
    };
    getUrgentOverrides(): any;
    buildNestedKey(nestedKey: string): UStoreClass;
}
declare const configStorage: Config;
export { configStorage };
declare const _default: {
    configStorage: Config;
};
export default _default;
//# sourceMappingURL=configStorage.d.ts.map