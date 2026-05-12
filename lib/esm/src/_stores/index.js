import { localStorage } from "./localStorage.js";
import { sessionStorage } from "./sessionStorage.js";
import { cookieStorage } from "./cookieStorage.js";
import { memoryStorage } from "./memoryStorage.js";
import { secureStorage } from "./secureStorage.js";
import { vuexStorage } from "./vuexStorage.js";
import { piniaStorage } from "./piniaStorage.js";
import { gunStorage } from "./gunStorage.js";
import { configStorage } from "./configStorage.js";
import { idbStorage } from "./idbStorage.js";
import { webqlStorage } from "./webqlStorage.js";
import { signalStorage } from "./signalStorage.js";
import { rxjsStorage } from "./rxjsStorage.js";
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
//# sourceMappingURL=index.js.map