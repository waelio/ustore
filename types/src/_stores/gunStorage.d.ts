export declare const storeName = "uStoreGunDB";
type p = string | any;
export declare const db: import("gun").IGunInstance<any>;
export declare const gunStorage: {
    get: (key: string, callBack?: Function) => Promise<unknown>;
    set: (newKey: string, newValue: p) => Promise<unknown>;
    remove: (key: string) => Promise<unknown>;
};
export default gunStorage;
//# sourceMappingURL=gunStorage.d.ts.map