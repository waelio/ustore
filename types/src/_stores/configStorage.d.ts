export declare const isProcess: () => boolean;
export declare class Config {
    [x: string]: unknown;
    private _store;
    private _env;
    constructor();
    set(key: string, value: unknown): void;
    getAll(): Record<string, unknown>;
    getItem(key: string): unknown;
    get(key: string): unknown;
    client(): unknown;
    dev(): unknown;
    server(): unknown;
    store(): Record<string, unknown>;
    has(key: string): boolean;
    private setEnvironment;
    private getServerVars;
    private getClientVars;
    private getUrgentOverrides;
    private buildNestedKey;
}
export type ConfigStorage = typeof configStorage;
declare const configStorage: Config;
export { configStorage };
declare const _default: Config;
export default _default;
//# sourceMappingURL=configStorage.d.ts.map