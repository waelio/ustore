import { createStore } from "vuex";
import { StorePlugins } from "../types";
import { app } from "./uStoreStorage";
const vuexStore = createStore({
    state: () => ({
        raw: {
            type: StorePlugins,
            value: {},
        },
    }),
    getters: {
        getMyValue: (state) => state.raw.value,
        store: (state) => state.raw.value,
        type: (state) => state.raw.type,
        getAll: (state) => state.raw.value,
        getItem: (state) => (key) => state.raw.value[key],
    },
    mutations: {
        addItem(state, payload) {
            const raw = state.raw.value;
            if (typeof payload === "object") {
                raw[payload.key] = payload.value;
            }
            else if (typeof payload === "string") {
                raw[payload] = payload;
            }
            state.raw.value = raw;
        },
        setItem(state, payload) {
            const raw = state.raw.value;
            if (typeof payload === "object") {
                raw[payload.key] = payload.value;
            }
            else if (typeof payload === "string") {
                raw[payload] = payload;
            }
            state.raw.value = raw;
        },
        removeItem(state, key) {
            delete state.raw.value[key];
        },
    },
    strict: true,
});
app.use(vuexStore);
export const vuexStorage = {
    get: vuexStore.getters.getAll,
    getItem: (key) => vuexStore.getters.getItem(key),
    addItem: (key, value) => vuexStore.commit("addItem", { key, value }),
    has: (key) => vuexStore.getters.getItem(key),
    set: (key, value) => {
        vuexStore.commit("setItem", { key, value });
    },
    setItem: (key, value) => {
        vuexStore.commit("setItem", { key, value });
    },
    removeItem: (key) => {
        vuexStore.commit("removeItem", key);
        return true;
    },
};
export default vuexStorage;
//# sourceMappingURL=vuexStorage.js.map