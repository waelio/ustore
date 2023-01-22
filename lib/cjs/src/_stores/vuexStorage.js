"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuexStorage = exports.vuexStore = void 0;
const vuex_1 = require("vuex");
const vue_1 = require("vue");
const types_1 = require("../types");
const app = (0, vue_1.createApp)({});
exports.vuexStore = (0, vuex_1.createStore)({
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
app.use(exports.vuexStore);
exports.vuexStorage = {
    get: () => exports.vuexStore.getters.getMyValue,
    getItem: (key) => exports.vuexStore.getters.getMyValue[key],
    set: (key, value) => {
        exports.vuexStore.commit("setItem", { key, value });
    },
    setItem: (key, value) => {
        exports.vuexStore.commit("setItem", { key, value });
    },
    has: (key) => exports.vuexStore.getters.getItem(key),
    removeItem: (key) => {
        exports.vuexStore.commit("removeItem", key);
        return true;
    },
};
exports.default = exports.vuexStorage;
//# sourceMappingURL=vuexStorage.js.map