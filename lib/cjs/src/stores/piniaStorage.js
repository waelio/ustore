"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piniaStorage = exports.app = void 0;
const pinia_1 = require("pinia");
const vue_1 = require("vue");
const waelio_utils_1 = require("waelio-utils");
exports.app = (0, vue_1.createApp)({});
const pinia = (0, pinia_1.createPinia)();
exports.app.use(pinia);
const useStore = (0, pinia_1.defineStore)("piniaStorage", {
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
exports.piniaStorage = ({
    get: () => pn_storage.get,
    set: (value) => {
        pn_storage.add(value);
    },
    remove: () => pn_storage.remove
});
exports.default = exports.piniaStorage;
//# sourceMappingURL=piniaStorage.js.map