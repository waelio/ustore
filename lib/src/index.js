import configStorage, { Config } from "../src/storages/configStorage";
import { cookieStorage } from "../src/storages/cookieStorage";
import gunStorage from "../src/storages/gunStorage";
import idbStorage from "../src/storages/idbStorage";
import memoryStorage from "../src/storages/memoryStorage";
import piniaStorage, { createPinia, defineStore, } from "../src/storages/piniaStorage";
import secureStorage from "../src/storages/secureStorage";
import { vuexStorage } from "../src/storages/index";
import webqlStorage from "../src/storages/webqlStorage";
import { localStorage } from "../src/storages/localStorage";
import { sessionStorage } from "../src/storages/sessionStorage";
import { app, createApp } from "../src/storages/uStoreStorage";
export { Config };
export { app };
export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { secureStorage };
export { configStorage };
export { idbStorage };
export { webqlStorage };
export { createPinia, defineStore };
export { createApp };
export const uStore = {
    local: localStorage,
    session: sessionStorage,
    cookie: cookieStorage,
    memory: memoryStorage,
    vuex: vuexStorage,
    pinia: piniaStorage,
    gun: gunStorage,
    secure: secureStorage,
    config: configStorage,
    idb: idbStorage,
    wsbl: webqlStorage,
};
export default uStore;
if (typeof window !== "undefined") {
    window["uStore"] = uStore;
}
else {
    globalThis["uStore"] = uStore;
}
//# sourceMappingURL=index.js.map