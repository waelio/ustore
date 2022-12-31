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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./localStorage", "./sessionStorage", "./cookieStorage", "./memoryStorage", "./vuexStorage", "./piniaStorage", "./piniaStorage", "./piniaStorage", "./uStoreStorage", "./gunStorage", "./secureStorage", "./configStorage", "./configStorage", "./idbStorage", "./webqlStorage", "./uStoreStorage", "store2", "vue", "vuex", "pinia", "gun", "waelio-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._decrypt = exports._encrypt = exports.gun = exports.pinia = exports.vuex = exports.vue = exports.store = exports.webqlStorage = exports.idbStorage = exports.configStorage = exports.secureStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = exports.Config = exports.createApp = exports.defineStore = exports.createPinia = exports.app = void 0;
    const localStorage_1 = require("./localStorage");
    Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
    const sessionStorage_1 = require("./sessionStorage");
    Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
    const cookieStorage_1 = require("./cookieStorage");
    Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
    const memoryStorage_1 = require("./memoryStorage");
    Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return memoryStorage_1.memoryStorage; } });
    const vuexStorage_1 = require("./vuexStorage");
    Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return vuexStorage_1.vuexStorage; } });
    const piniaStorage_1 = require("./piniaStorage");
    Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return piniaStorage_1.piniaStorage; } });
    const piniaStorage_2 = require("./piniaStorage");
    Object.defineProperty(exports, "createPinia", { enumerable: true, get: function () { return piniaStorage_2.createPinia; } });
    const piniaStorage_3 = require("./piniaStorage");
    Object.defineProperty(exports, "defineStore", { enumerable: true, get: function () { return piniaStorage_3.defineStore; } });
    const uStoreStorage_1 = require("./uStoreStorage");
    Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return uStoreStorage_1.createApp; } });
    const gunStorage_1 = require("./gunStorage");
    Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
    const secureStorage_1 = require("./secureStorage");
    Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return secureStorage_1.secureStorage; } });
    const configStorage_1 = require("./configStorage");
    Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return configStorage_1.configStorage; } });
    const configStorage_2 = require("./configStorage");
    Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return configStorage_2.Config; } });
    const idbStorage_1 = require("./idbStorage");
    Object.defineProperty(exports, "idbStorage", { enumerable: true, get: function () { return idbStorage_1.idbStorage; } });
    const webqlStorage_1 = require("./webqlStorage");
    Object.defineProperty(exports, "webqlStorage", { enumerable: true, get: function () { return webqlStorage_1.webqlStorage; } });
    exports.app = (0, uStoreStorage_1.createApp)({});
    const uStoreStorage_2 = __importDefault(require("./uStoreStorage"));
    exports.uStore = uStoreStorage_2.default;
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
    const waelio_utils_1 = require("waelio-utils");
    Object.defineProperty(exports, "_decrypt", { enumerable: true, get: function () { return waelio_utils_1._decrypt; } });
    Object.defineProperty(exports, "_encrypt", { enumerable: true, get: function () { return waelio_utils_1._encrypt; } });
    exports.default = uStoreStorage_2.default;
    if (typeof window !== "undefined") {
        window["uStore"] = uStoreStorage_2.default;
    }
    else {
        globalThis["uStore"] = uStoreStorage_2.default;
    }
});
//# sourceMappingURL=index.js.map