import { localStorage } from "./stores/localStorage";
import { sessionStorage } from "./stores/sessionStorage";
import { cookieStorage } from "./stores/cookieStorage";
import { memoryStorage } from "./stores/memoryStorage";
import { vuexStorage } from "./stores/vuexStorage";
import { piniaStorage } from "./stores/piniaStorage";
import { gunStorage } from "./stores/gunStorage";
import { configStorage } from "./stores/configStorage";
declare const uStore: () => {
    local: import("./").UStoreClass;
    session: import("./").UStoreClass;
    cookie: import("./").UStoreClass;
    memory: import("./").UStoreClass;
    vuex: import("./").UStoreClass;
    pinia: import("./").UStoreClass;
    gun: import("./").UStoreClass;
    config: {
        [x: string]: any;
        _store: import("./").UStoreClass;
        set(key: string, value: any): void;
        getAll(): import("./").UStoreClass;
        getItem(key: string): any;
        get(key: string): any;
        client(): any;
        dev(): any;
        server(): any;
        store(): import("./").UStoreClass;
        has(key: string): boolean;
        setEnvironment(): void;
        getServerVars(): {};
        getClientVars(): {
            [key: string]: any;
        };
        getUrgentOverrides(): any;
        buildNestedKey(nestedKey: string): import("./").UStoreClass;
    };
};
export { uStore };
export default uStore;
export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { configStorage };
//# sourceMappingURL=index.d.ts.map