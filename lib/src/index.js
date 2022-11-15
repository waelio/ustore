import { localStorage } from "./stores/localStorage";
import { sessionStorage } from "./stores/sessionStorage";
import { cookieStorage } from "./stores/cookieStorage";
import { memoryStorage } from "./stores/memoryStorage";
import { vuexStorage } from "./stores/vuexStorage";
import { piniaStorage } from "./stores/piniaStorage";
import { gunStorage } from "./stores/gunStorage";
import { secureStorage } from "./stores";
import { configStorage } from "./stores";
import { idbStorage } from "./stores";
import { webqlStorage } from "./stores";
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
if (typeof window !== "undefined") {
    window["uStore"] = uStore;
}
else {
    globalThis["uStore"] = uStore;
}
//# sourceMappingURL=index.js.map