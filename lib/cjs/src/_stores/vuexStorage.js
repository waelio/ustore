"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuexStorage = exports.app = void 0;
const vue_1 = require("vue");
const vuex_1 = require("vuex");
exports.app = (0, vue_1.createApp)({});
const vuexStore = (0, vuex_1.createStore)({
    state: () => ({
        myValue: "",
    }),
    mutations: {
        setMyValue(state, value) {
            if (typeof value === "string") {
                state.myValue = value;
            }
            else if (typeof value === "object") {
                Object.keys(value).forEach((key) => {
                    state.myValue = value[key];
                });
            }
        },
    },
    actions: {
        set(context, value) {
            context.commit("setMyValue", value);
        },
    },
    getters: {
        getMyValue: (state) => state.myValue,
    },
    strict: true,
});
exports.vuexStorage = {
    get: () => vuexStore.getters.getMyValue,
    has: () => !!vuexStore.getters.getMyValue,
    add: (key, value) => {
        const payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
    set: (key, value) => {
        const payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
    setItem: (key, value) => {
        let payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
    removeItem: (key) => {
        const payload = new Object();
        payload[key] = null;
        return vuexStore.commit("setMyValue", payload);
    },
};
exports.default = exports.vuexStorage;
//# sourceMappingURL=vuexStorage.js.map