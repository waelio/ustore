export declare const app: import("vue").App<Element>;
declare module 'pinia' {
    interface MapStoresCustomization {
        suffix: '';
    }
}
export type _State = {
    raw: any;
};
export declare const piniaStorage: {
    get: () => any;
    set: (value: any) => void;
    remove: () => (state: any) => void;
};
export default piniaStorage;
//# sourceMappingURL=piniaStorage.d.ts.map