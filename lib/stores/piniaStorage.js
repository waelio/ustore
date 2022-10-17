"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piniaStorage = exports.app = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.app = (0, vue_1.createApp)({});
var pinia = (0, pinia_1.createPinia)();
exports.app.use(pinia);
var useStore = (0, pinia_1.defineStore)("piniaStorage", {
    state: function () { return ({
        raw: '',
    }); },
    getters: {
        get: function (state) { return function (key) { return !!key && !!state.raw[key] ? state.raw[key] : state.raw; }; }
    },
    actions: {
        add: function (k) {
            this.raw = k;
        },
        remove: function (state) {
            state.raw = undefined;
        },
    },
});
var pn_storage = useStore();
exports.piniaStorage = ({
    get: function () { return pn_storage.get; },
    set: function (key, value) {
        var payload = {};
        payload[key] = value;
        pn_storage.add(payload);
    },
    remove: function () { return pn_storage.remove; },
});
exports.default = exports.piniaStorage;
//# sourceMappingURL=piniaStorage.js.map