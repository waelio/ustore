import { localStorage } from "./_stores/localStorage";
import { sessionStorage } from "./_stores/sessionStorage";
import { cookieStorage } from "./_stores/cookieStorage";
import { memoryStorage } from "./_stores/memoryStorage";
import { vuexStorage } from "./_stores/vuexStorage";
import { piniaStorage } from "./_stores/piniaStorage";
import { gunStorage } from "./_stores/gunStorage";
import { secureStorage } from "./_stores/secureStorage";
import { configStorage } from "./_stores/configStorage";
import { idbStorage } from "./_stores/idbStorage";
import { webqlStorage } from "./_stores/webqlStorage";
import { signalStorage } from "./_stores/signalStorage";
import { rxjsStorage } from "./_stores/rxjsStorage";
const gunPlaceholder = new Proxy({}, {
    get() {
        throw new Error("uStore.gun is unavailable in native Node ESM entry. Use CommonJS require() or a bundler to access Gun storage.");
    },
    apply() {
        throw new Error("uStore.gun is unavailable in native Node ESM entry. Use CommonJS require() or a bundler to access Gun storage.");
    },
});
export const uStore = {
    config: configStorage,
    cookie: cookieStorage,
    gun: gunPlaceholder,
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
export { gunStorage };
export { secureStorage };
export { configStorage };
export { idbStorage };
export { webqlStorage };
export { signalStorage };
export { rxjsStorage };
if (typeof window !== "undefined") {
    window["uStore"] = uStore;
}
else {
    globalThis["uStore"] = uStore;
}
//# sourceMappingURL=index.node.js.map