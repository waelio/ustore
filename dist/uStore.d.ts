declare var StoreTypes: any;
declare const localStorage: {
    get: (key: any) => unknown;
    set: (key: any, value: any) => unknown;
    remove: (key: any) => unknown;
};
declare const sessionStorage: {
    get: (key: any) => string | null;
    set: (key: any, value: any) => void;
    remove: (key: any) => void;
};
declare const cookieStorage: {
    get: (key: any) => unknown;
    set: (key: any, value: any) => unknown;
    remove: (key: any) => unknown;
};
declare const memoryStorage: {
    get: (key: any) => any;
    set: (key: any, value: any) => boolean;
    remove: (key: any) => boolean;
};
declare const vuexStorage: {
    get: (key: any) => any;
    set: (key: any, value: any) => void;
};
declare const piniaStorage: {
    get: (key: any) => string | null;
    set: (key: any, value: any) => void;
};
// export const user = db.user().recall({ sessionStorage: true });
// gunStorage
declare const gunStorage: {
    get: (key: any) => any;
    set: (key: any, value: any) => Promise<unknown>;
    remove: (key: any) => Promise<any>;
};
declare const initialStore: any;
declare const uStore: (options: any) => {
    get: (key: any) => any;
    set: (key: any, value: any) => void;
};
export { uStore as default, uStore, localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage, StoreTypes, initialStore };
