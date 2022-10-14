"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuexStorage = exports.app = void 0;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
exports.app = (0, vue_1.createApp)({});
var vuexStore = (0, vuex_1.createStore)({
    state: function () { return ({
        myValue: "",
    }); },
    mutations: {
        setMyValue: function (state, value) {
            if (typeof value === "string") {
                state.myValue = value;
            }
            else if (typeof value === "object") {
                Object.keys(value).forEach(function (key) {
                    state.myValue = value[key];
                });
            }
        },
    },
    getters: {
        getMyValue: function (state) {
            return state.myValue;
        },
    },
    strict: true,
});
exports.app.use(vuexStore);
exports.vuexStorage = {
    get: function (key) { return vuexStore.getters.getMyValue[key]; },
    set: function (key, value) {
        var payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
};
exports.default = exports.vuexStorage;
//# sourceMappingURL=vuexStorage.js.map