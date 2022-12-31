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
        define(["require", "exports", "../src/storages/configStorage", "../src/storages/cookieStorage", "../src/storages/gunStorage", "../src/storages/idbStorage", "../src/storages/memoryStorage", "../src/storages/piniaStorage", "../src/storages/secureStorage", "../src/storages/index", "../src/storages/webqlStorage", "../src/storages/localStorage", "../src/storages/sessionStorage", "../src/storages/uStoreStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uStore = exports.createApp = exports.defineStore = exports.createPinia = exports.webqlStorage = exports.idbStorage = exports.configStorage = exports.secureStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.app = exports.Config = void 0;
    const configStorage_1 = __importStar(require("../src/storages/configStorage"));
    exports.configStorage = configStorage_1.default;
    Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return configStorage_1.Config; } });
    const cookieStorage_1 = require("../src/storages/cookieStorage");
    Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
    const gunStorage_1 = __importDefault(require("../src/storages/gunStorage"));
    exports.gunStorage = gunStorage_1.default;
    const idbStorage_1 = __importDefault(require("../src/storages/idbStorage"));
    exports.idbStorage = idbStorage_1.default;
    const memoryStorage_1 = __importDefault(require("../src/storages/memoryStorage"));
    exports.memoryStorage = memoryStorage_1.default;
    const piniaStorage_1 = __importStar(require("../src/storages/piniaStorage"));
    exports.piniaStorage = piniaStorage_1.default;
    Object.defineProperty(exports, "createPinia", { enumerable: true, get: function () { return piniaStorage_1.createPinia; } });
    Object.defineProperty(exports, "defineStore", { enumerable: true, get: function () { return piniaStorage_1.defineStore; } });
    const secureStorage_1 = __importDefault(require("../src/storages/secureStorage"));
    exports.secureStorage = secureStorage_1.default;
    const index_1 = require("../src/storages/index");
    Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return index_1.vuexStorage; } });
    const webqlStorage_1 = __importDefault(require("../src/storages/webqlStorage"));
    exports.webqlStorage = webqlStorage_1.default;
    const localStorage_1 = require("../src/storages/localStorage");
    Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
    const sessionStorage_1 = require("../src/storages/sessionStorage");
    Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
    const uStoreStorage_1 = require("../src/storages/uStoreStorage");
    Object.defineProperty(exports, "app", { enumerable: true, get: function () { return uStoreStorage_1.app; } });
    Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return uStoreStorage_1.createApp; } });
    exports.uStore = {
        local: localStorage_1.localStorage,
        session: sessionStorage_1.sessionStorage,
        cookie: cookieStorage_1.cookieStorage,
        memory: memoryStorage_1.default,
        vuex: index_1.vuexStorage,
        pinia: piniaStorage_1.default,
        gun: gunStorage_1.default,
        secure: secureStorage_1.default,
        config: configStorage_1.default,
        idb: idbStorage_1.default,
        wsbl: webqlStorage_1.default,
    };
    exports.default = exports.uStore;
    if (typeof window !== "undefined") {
        window["uStore"] = exports.uStore;
    }
    else {
        globalThis["uStore"] = exports.uStore;
    }
});
//# sourceMappingURL=index.js.map