import { localStorage } from "./stores/localStorage";
import { sessionStorage } from "./stores/sessionStorage";
import { cookieStorage } from "./stores/cookieStorage";
import { memoryStorage } from "./stores/memoryStorage";
import { vuexStorage } from "./stores/vuexStorage";
import { piniaStorage } from "./stores/piniaStorage";
import { gunStorage } from "./stores/gunStorage";
export declare type uStore = {
    local: typeof localStorage;
    session: typeof sessionStorage;
    cookie: typeof cookieStorage;
    memory: typeof memoryStorage;
    vuex: typeof vuexStorage;
    pinia: typeof piniaStorage;
    gun: typeof gunStorage;
};
export declare const uStore: {
    local: import("./").UStoreClass;
    session: import("./").UStoreClass;
    cookie: import("./").UStoreClass;
    memory: import("./").UStoreClass;
    vuex: {
        get: () => (state: import("./stores/vuexStorage")._possibleStateValues) => import("./stores/vuexStorage")._possibleStateValues;
        add: (key: string, value: any) => any;
        set: (key: string, value: any) => any;
    };
    pinia: import("./").UStoreClass;
    gun: import("./").UStoreClass;
};
export default uStore;
export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
//# sourceMappingURL=index.d.ts.map