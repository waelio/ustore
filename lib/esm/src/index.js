import { localStorage } from "./_stores/localStorage.js";
import { sessionStorage } from "./_stores/sessionStorage.js";
import { cookieStorage } from "./_stores/cookieStorage.js";
import { memoryStorage } from "./_stores/memoryStorage.js";
import { vuexStorage } from "./_stores/vuexStorage.js";
import { piniaStorage } from "./_stores/piniaStorage.js";
import { gunStorage } from "./_stores/gunStorage.js";
import { secureStorage } from "./_stores/secureStorage.js";
import { configStorage } from "./_stores/configStorage.js";
import { idbStorage } from "./_stores/idbStorage.js";
import { webqlStorage } from "./_stores/webqlStorage.js";
import { signalStorage } from "./_stores/signalStorage.js";
import { rxjsStorage } from "./_stores/rxjsStorage.js";
export const uStore = {
    config: configStorage,
    cookie: cookieStorage,
    gun: gunStorage,
    local: localStorage,
    memory: memoryStorage,
    pinia: piniaStorage,
    secure: secureStorage,
    session: sessionStorage,
    vuex: vuexStorage,
    idb: idbStorage,
    webql: webqlStorage,
    signal: signalStorage,
    rxjs: rxjsStorage,
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
export { signalStorage };
export { rxjsStorage };
export { createMessagingStore } from "./messaging/index.js";
if (typeof window !== "undefined") {
    window["uStore"] = uStore;
}
else {
    globalThis["uStore"] = uStore;
}
//# sourceMappingURL=index.js.map