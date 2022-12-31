import { createPinia, defineStore } from "pinia";
import { IUStoreClassInterface } from "../.d";
import { StorePlugins } from "../types";
import { IUStoreClass } from "./uStoreStorage";
export declare const usePiniaStore: import("pinia").StoreDefinition<"data", {
    raw: {
        type: typeof StorePlugins;
        value: {};
    };
}, {
    store: () => () => {};
    type: () => () => {
        readonly local: StorePlugins.local;
        readonly session: StorePlugins.session;
        readonly cookie: StorePlugins.cookie;
        readonly memory: StorePlugins.memory;
        readonly vuex: StorePlugins.vuex;
        readonly pinia: StorePlugins.pinia;
        readonly gun: StorePlugins.gun;
    };
}, {
    get(): {};
    getIem(key: string): any;
    addItem(key: string, value: any): void;
    setIem(key: string, value: unknown): void;
    removeItem(key: string): void;
}>;
export declare const piniaStorage: IUStoreClass;
declare const _default: IUStoreClassInterface;
export default _default;
export { createPinia, defineStore };
//# sourceMappingURL=piniaStorage.d.ts.map