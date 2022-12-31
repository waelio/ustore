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
        define(["require", "exports", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src/index", "./src", "store2", "vue", "vuex", "pinia", "gun", "waelio-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._decrypt = exports._encrypt = exports.gun = exports.pinia = exports.vuex = exports.vue = exports.store = exports.webqlStorage = exports.idbStorage = exports.configStorage = exports.secureStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
    const index_1 = require("./src/index");
    Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return index_1.localStorage; } });
    const index_2 = require("./src/index");
    Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return index_2.sessionStorage; } });
    const index_3 = require("./src/index");
    Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return index_3.cookieStorage; } });
    const index_4 = require("./src/index");
    Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return index_4.memoryStorage; } });
    const index_5 = require("./src/index");
    Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return index_5.vuexStorage; } });
    const index_6 = require("./src/index");
    Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return index_6.piniaStorage; } });
    const index_7 = require("./src/index");
    Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return index_7.gunStorage; } });
    const index_8 = require("./src/index");
    Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return index_8.secureStorage; } });
    const index_9 = require("./src/index");
    Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return index_9.configStorage; } });
    const index_10 = require("./src/index");
    Object.defineProperty(exports, "idbStorage", { enumerable: true, get: function () { return index_10.idbStorage; } });
    const index_11 = require("./src/index");
    Object.defineProperty(exports, "webqlStorage", { enumerable: true, get: function () { return index_11.webqlStorage; } });
    const src_1 = __importDefault(require("./src"));
    exports.uStore = src_1.default;
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
    exports.default = src_1.default;
    if (typeof window !== 'undefined') {
        window['uStore'] = src_1.default;
    }
    else {
        globalThis['uStore'] = src_1.default;
    }
});
//# sourceMappingURL=index.js.map