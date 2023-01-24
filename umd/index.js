var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./src/_stores/configStorage", "./src/_stores/cookieStorage", "./src/_stores/idbStorage", "./src/_stores/gunStorage", "./src/_stores/localStorage", "./src/_stores/memoryStorage", "./src/_stores/piniaStorage", "./src/_stores/secureStorage", "./src/_stores/sessionStorage", "./src/_stores/vuexStorage", "./src/_stores/webqlStorage", "./src/_stores/uStoreStorage", "pinia", "pinia", "./src/_stores/uStoreStorage", "store2", "vue", "vuex", "pinia", "gun", "waelio-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._decrypt = exports._encrypt = exports.gun = exports.pinia = exports.vuex = exports.vue = exports.store = exports.webqlStorage = exports.vuexStorage = exports.piniaStorage = exports.localStorage = exports.idbStorage = exports.gunStorage = exports.cookieStorage = exports.configStorage = exports.sessionStorage = exports.secureStorage = exports.memoryStorage = exports.uStore = exports.defineStore = exports.createPinia = exports.app = void 0;
    const configStorage_1 = require("./src/_stores/configStorage");
    Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return configStorage_1.configStorage; } });
    const cookieStorage_1 = require("./src/_stores/cookieStorage");
    Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
    const idbStorage_1 = require("./src/_stores/idbStorage");
    Object.defineProperty(exports, "idbStorage", { enumerable: true, get: function () { return idbStorage_1.idbStorage; } });
    const gunStorage_1 = require("./src/_stores/gunStorage");
    Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
    const localStorage_1 = require("./src/_stores/localStorage");
    Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
    const memoryStorage_1 = require("./src/_stores/memoryStorage");
    Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return memoryStorage_1.memoryStorage; } });
    const piniaStorage_1 = require("./src/_stores/piniaStorage");
    Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return piniaStorage_1.piniaStorage; } });
    const secureStorage_1 = require("./src/_stores/secureStorage");
    Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return secureStorage_1.secureStorage; } });
    const sessionStorage_1 = require("./src/_stores/sessionStorage");
    Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
    const vuexStorage_1 = require("./src/_stores/vuexStorage");
    Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return vuexStorage_1.vuexStorage; } });
    const webqlStorage_1 = require("./src/_stores/webqlStorage");
    Object.defineProperty(exports, "webqlStorage", { enumerable: true, get: function () { return webqlStorage_1.webqlStorage; } });
    const uStoreStorage_1 = require("./src/_stores/uStoreStorage");
    Object.defineProperty(exports, "uStore", { enumerable: true, get: function () { return uStoreStorage_1.uStoreStorage; } });
    const pinia_1 = require("pinia");
    Object.defineProperty(exports, "createPinia", { enumerable: true, get: function () { return pinia_1.createPinia; } });
    const pinia_2 = require("pinia");
    Object.defineProperty(exports, "defineStore", { enumerable: true, get: function () { return pinia_2.defineStore; } });
    const uStoreStorage_2 = require("./src/_stores/uStoreStorage");
    const store = __importStar(require("store2"));
    exports.store = store;
    const vue = __importStar(require("vue"));
    exports.vue = vue;
    const vuex = __importStar(require("vuex"));
    exports.vuex = vuex;
    const pinia = __importStar(require("pinia"));
    exports.pinia = pinia;
    const gun = __importStar(require("gun"));
    exports.gun = gun;
    exports.app = (0, uStoreStorage_2.createApp)({});
    const waelio_utils_1 = require("waelio-utils");
    Object.defineProperty(exports, "_decrypt", { enumerable: true, get: function () { return waelio_utils_1._decrypt; } });
    Object.defineProperty(exports, "_encrypt", { enumerable: true, get: function () { return waelio_utils_1._encrypt; } });
    exports.default = uStoreStorage_1.uStoreStorage;
    if (typeof window !== "undefined") {
        window["uStore"] = uStoreStorage_1.uStoreStorage;
    }
    else {
        globalThis["uStore"] = uStoreStorage_1.uStoreStorage;
    }
});
//# sourceMappingURL=index.js.map