export declare const idbStorage: {
    get: (key: string) => Promise<unknown>;
    getItem: (key: string) => Promise<unknown>;
    set: (key: any, value: any) => Promise<any>;
    has: (key: string) => boolean;
    remove: (key: string) => Promise<unknown>;
};
export default idbStorage;
//# sourceMappingURL=idbStorage.d.ts.map