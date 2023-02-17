(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "waelio-utils", "pinia", "pinia", "vue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.piniaStorage = exports.app = void 0;
    const waelio_utils_1 = require("waelio-utils");
    const pinia_1 = require("pinia");
    const pinia_2 = require("pinia");
    const vue_1 = require("vue");
    exports.app = (0, vue_1.createApp)({});
    const pinia = (0, pinia_2.createPinia)();
    exports.app.use(pinia);
    (0, pinia_1.setMapStoreSuffix)("");
    const useStore = (0, pinia_2.defineStore)("piniaStorage", {
        state: () => ({
            raw: "",
        }),
        getters: {
            get: (state) => (0, waelio_utils_1._reParseString)(state.raw),
        },
        actions: {
            add(k) {
                this.raw = k;
            },
            remove(state) {
                state.raw = undefined;
            },
        },
    });
    const pn_storage = useStore();
    exports.piniaStorage = {
        get: () => pn_storage.get,
        set: (value) => {
            pn_storage.add(value);
        },
        remove: () => pn_storage.remove,
    };
    exports.default = exports.piniaStorage;
});
//# sourceMappingURL=piniaStorage.js.map