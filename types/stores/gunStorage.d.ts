export declare const storeName = "uStoreGunDB";
export declare const db: import("gun/types").IGunInstance<any>;
export declare const gunStorage: {
    getItem: (key: string) => Promise<unknown>;
    get: (key: string) => Promise<unknown>;
    setItem: (key: string, value: string) => object;
    remove: (key: string) => Promise<unknown>;
};
export default gunStorage;
//# sourceMappingURL=gunStorage.d.ts.map