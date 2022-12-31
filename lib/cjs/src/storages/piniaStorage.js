"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineStore = exports.createPinia = exports.piniaStorage = exports.usePiniaStore = void 0;
const pinia_1 = require("pinia");
Object.defineProperty(exports, "createPinia", { enumerable: true, get: function () { return pinia_1.createPinia; } });
Object.defineProperty(exports, "defineStore", { enumerable: true, get: function () { return pinia_1.defineStore; } });
const types_1 = require("../types");
const uStoreStorage_1 = require("./uStoreStorage");
const pinia = (0, pinia_1.createPinia)();
(0, pinia_1.setMapStoreSuffix)("");
uStoreStorage_1.app.use(pinia);
exports.usePiniaStore = (0, pinia_1.defineStore)("data", {
    state: () => ({
        raw: {
            type: types_1.StorePlugins,
            value: {},
        },
    }),
    getters: {
        store: function () {
            return () => this.raw.value;
        },
        type: function () {
            return () => this.raw.type;
        },
    },
    actions: {
        get() {
            return this.raw.value;
        },
        getIem(key) {
            return this.raw.value[key];
        },
        addItem(key, value) {
            const raw = this.raw.value;
            raw[key] = value;
            this.raw.value = raw;
        },
        setIem(key, value) {
            this.raw.value[key] = value;
        },
        removeItem(key) {
            delete this.raw.value[key];
        },
    },
});
const temp_store = (0, exports.usePiniaStore)();
const options = {
    client: true,
    server: true,
    dev: true,
    prod: true,
    plugin: true,
};
exports.piniaStorage = new uStoreStorage_1.IUStoreClass(temp_store === null || temp_store === void 0 ? void 0 : temp_store.store, options);
exports.default = exports.piniaStorage;
//# sourceMappingURL=piniaStorage.js.map