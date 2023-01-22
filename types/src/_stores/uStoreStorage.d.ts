import { createApp } from "vue";
export declare const app: import("vue").App<Element>;
export { createApp };
export declare const uStoreStorage: {
    config: import("./configStorage").Config;
    cookie: import("../").IUStoreClassInterface;
    gun: {
        get: (key: string, callBack?: Function | undefined) => Promise<unknown>;
        set: (newKey: string, newValue: any) => Promise<unknown>;
        remove: (key: string) => Promise<unknown>;
    };
    idb: {
        get: (key: string) => Promise<unknown>;
        getItem: (key: string) => Promise<unknown>;
        set: (key: any, value: any) => Promise<any>;
        has: (key: string) => boolean;
        remove: (key: string) => Promise<unknown>;
    };
    local: import("../").IUStoreClassInterface;
    memory: import("../core").UCORE;
    pinia: {
        get: () => any;
        getItem: (key: string) => any;
        set: (value: any) => void;
        setItem: (key: string, value: any) => void;
        remove: () => (state: any) => void;
    };
    secure: import("../").IuStore;
    session: import("../").IuStore;
    vuex: {
        get: () => any;
        getItem: (key: string) => any;
        set: (key: string, value: any) => void;
        setItem: (key: string, value: any) => void;
        has: (key: string) => any;
        removeItem: (key: string) => boolean;
    };
    wql: {
        get: (key: string) => Promise<unknown>;
        getItem: (key: string) => Promise<unknown>;
        set: (key: any, value: any) => Promise<any>;
        has: (key: string) => boolean;
        remove: (key: string) => Promise<unknown>;
    };
};
export default uStoreStorage;
//# sourceMappingURL=uStoreStorage.d.ts.map