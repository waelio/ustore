declare let store: LocalForage;
export { store };
export declare const idbStorage: {
    get: (key: string) => Promise<unknown>;
    getItem: (key: string) => Promise<unknown>;
    set: (key: any, value: any) => Promise<any>;
    setItem: (key: any, value: any) => Promise<any>;
    has: (key: string) => Promise<boolean>;
    hasItem: (key: string) => Promise<boolean>;
    remove: (key: string) => Promise<unknown>;
    removeItem: (key: string) => Promise<unknown>;
};
export default idbStorage;
//# sourceMappingURL=idbStorage.d.ts.map