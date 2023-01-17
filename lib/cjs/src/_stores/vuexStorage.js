"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuexStorage = void 0;
const vuex_1 = require("vuex");
const types_1 = require("../types");
const uStoreStorage_1 = require("./uStoreStorage");
const vuexStore = (0, vuex_1.createStore)({
    state: () => ({
        raw: {
            type: types_1.StorePlugins,
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
uStoreStorage_1.app.use(vuexStore);
exports.vuexStorage = {
    get: () => vuexStore.getters.getMyValue,
    getItem: (key) => vuexStore.getters.getMyValue[key],
    set: (key, value) => {
        vuexStore.commit("setItem", { key, value });
    },
    setItem: (key, value) => {
        vuexStore.commit("setItem", { key, value });
    },
    has: (key) => vuexStore.getters.getItem(key),
    removeItem: (key) => {
        vuexStore.commit("removeItem", key);
        return true;
    },
};
exports.default = exports.vuexStorage;
//# sourceMappingURL=vuexStorage.js.map