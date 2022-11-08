import { localStorage } from "./stores/localStorage";
import { sessionStorage } from "./stores/sessionStorage";
import { cookieStorage } from "./stores/cookieStorage";
import { memoryStorage } from "./stores/memoryStorage";
import { vuexStorage } from "./stores/vuexStorage";
import { piniaStorage } from "./stores/piniaStorage";
import { gunStorage } from "./stores/gunStorage";
import { secureStorage } from "./stores";
export declare type TuStore = {
    local: typeof localStorage;
    session: typeof sessionStorage;
    cookie: typeof cookieStorage;
    memory: typeof memoryStorage;
    vuex: typeof vuexStorage;
    pinia: typeof piniaStorage;
    gun: typeof gunStorage;
    secure: typeof secureStorage;
};
export declare const uStore: TuStore;
export default uStore;
export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { secureStorage };
//# sourceMappingURL=index.d.ts.map