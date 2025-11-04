import { localStorage } from "./_stores/localStorage.js";
import { sessionStorage } from "./_stores/sessionStorage.js";
import { cookieStorage } from "./_stores/cookieStorage.js";
import { memoryStorage } from "./_stores/memoryStorage.js";
import { vuexStorage } from "./_stores/vuexStorage.js";
import { piniaStorage } from "./_stores/piniaStorage.js";
import { gunStorage } from "./_stores/gunStorage.js";
import { secureStorage } from "./_stores/secureStorage.js";
import { configStorage } from "./_stores/configStorage.js";
import { signalStorage } from "./_stores/signalStorage.js";
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
    signal: signalStorage,
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
export { signalStorage };
if (typeof window !== "undefined") {
    window["uStore"] = uStore;
}
else {
    globalThis["uStore"] = uStore;
}
//# sourceMappingURL=index.js.map