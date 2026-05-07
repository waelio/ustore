import Keyv from "keyv";
export type ServerStoragePrimitive = string | number | boolean | null;
export type ServerStorageValue = ServerStoragePrimitive | {
    [key: string]: ServerStorageValue;
} | ServerStorageValue[];
export type ServerStorageSetOptions = {
    ttl?: number;
};
export type ServerStorageOptions = {
    keyv?: Keyv<ServerStorageValue>;
    store?: unknown;
    namespace?: string;
    ttl?: number;
};
export interface UStoreServerClass {
    type: "serverStorage";
    keyv: Keyv<ServerStorageValue>;
    get(key: string): Promise<ServerStorageValue | undefined>;
    getItem(key: string): Promise<ServerStorageValue | undefined>;
    set(key: string, value: ServerStorageValue, options?: ServerStorageSetOptions): Promise<Record<string, ServerStorageValue>>;
    setItem(key: string, value: ServerStorageValue, options?: ServerStorageSetOptions): Promise<Record<string, ServerStorageValue>>;
    remove(key: string): Promise<boolean>;
    removeItem(key: string): Promise<boolean>;
    has(key: string): Promise<boolean>;
    hasItem(key: string): Promise<boolean>;
    clear(): Promise<void>;
}
export declare const createServerStorage: (options?: ServerStorageOptions) => UStoreServerClass;
export declare const createMongoServerStorage: (connectionUri: string, options?: Omit<ServerStorageOptions, "keyv" | "store">) => UStoreServerClass;
export declare const serverStorage: UStoreServerClass;
export default serverStorage;
//# sourceMappingURL=server.d.ts.map