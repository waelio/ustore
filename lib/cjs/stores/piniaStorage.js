"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piniaStorage = exports.app = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.app = (0, vue_1.createApp)({});
var pinia = (0, pinia_1.createPinia)();
exports.app.use(pinia);
var useStore = (0, pinia_1.defineStore)('piniaStorage', {
    state: function () { return ({
        raw: undefined
    }); },
    getters: {
        get: function (state) { var _a; return (_a = state.raw) !== null && _a !== void 0 ? _a : 'undefined'; }
    },
    actions: {
        add: function (k) {
            return this.raw = k;
        },
        remove: function () {
            return this.raw = undefined;
        },
    },
});
var pn_storage = useStore();
exports.piniaStorage = ({
    get: function () { var _a; return (_a = pn_storage.get) !== null && _a !== void 0 ? _a : 'undefined'; },
    set: function (value) { return pn_storage.add(value); },
    remove: function () { return pn_storage.remove; }
});
exports.default = exports.piniaStorage;
//# sourceMappingURL=piniaStorage.js.map