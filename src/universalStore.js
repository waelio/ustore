import { StoreTypes } from './types';
import { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, gunStorage, piniaStorage } from './stores/index';
export { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage };
export { StoreTypes };
const initialStore = StoreTypes.local;
export const UniversalStore = (storePluginType = initialStore) => {
    switch (storePluginType) {
        case StoreTypes.local:
            return localStorage;
        case StoreTypes.session:
            return sessionStorage;
        case StoreTypes.cookie:
            return cookieStorage;
        case StoreTypes.memory:
            return memoryStorage;
        case StoreTypes.vuex:
            return vuexStorage;
        case StoreTypes.pinia:
            return piniaStorage;
        case StoreTypes.gun:
            return gunStorage;
        default:
            return localStorage;
    }
};
export default UniversalStore;
//# sourceMappingURL=universalStore.js.map