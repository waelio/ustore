import { StorePlugins } from "../types";
export declare const vuexStore: import("vuex").Store<{
    raw: {
        type: typeof StorePlugins;
        value: {};
    };
}>;
export declare const vuexStorage: {
    get: () => any;
    getItem: (key: string) => any;
    set: (key: string, value: any) => void;
    setItem: (key: string, value: any) => void;
    has: (key: string) => any;
    removeItem: (key: string) => boolean;
};
export default vuexStorage;
//# sourceMappingURL=vuexStorage.d.ts.map