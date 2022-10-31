(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vue", "vuex"], factory);
    }
})(function (require, exports) {
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
    };
    exports.default = exports.vuexStorage;
});
//# sourceMappingURL=vuexStorage.js.map