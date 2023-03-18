import { localStorage } from "./localStorage";
import { sessionStorage } from "./sessionStorage";
import { cookieStorage } from "./cookieStorage";
import { memoryStorage } from "./memoryStorage";
import { secureStorage } from "./secureStorage";
import { vuexStorage } from "./vuexStorage";
import { piniaStorage } from "./piniaStorage";
import { gunStorage } from "./gunStorage";
import { configStorage } from "./configStorage";
import { idbStorage } from "./idbStorage";
import { webqlStorage } from "./webqlStorage";
import { signalStorage } from "./signalStorage";
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
//# sourceMappingURL=index.js.map