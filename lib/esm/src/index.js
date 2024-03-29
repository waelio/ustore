import { localStorage } from "./_stores/localStorage";
import { sessionStorage } from "./_stores/sessionStorage";
import { cookieStorage } from "./_stores/cookieStorage";
import { memoryStorage } from "./_stores/memoryStorage";
import { vuexStorage } from "./_stores/vuexStorage";
import { piniaStorage } from "./_stores/piniaStorage";
import { gunStorage } from "./_stores/gunStorage";
import { secureStorage } from "./_stores/secureStorage";
import { configStorage } from "./_stores/configStorage";
import { signalStorage } from "./_stores/signalStorage";
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