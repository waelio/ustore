(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vuex", "../types", "./uStoreStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.vuexStorage = exports.vuexStore = void 0;
    const vuex_1 = require("vuex");
    const types_1 = require("../types");
    const uStoreStorage_1 = require("./uStoreStorage");
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
    () => uStoreStorage_1.app.use(exports.vuexStore);
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
});
//# sourceMappingURL=vuexStorage.js.map