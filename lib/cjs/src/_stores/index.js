"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webqlStorage = exports.idbStorage = exports.configStorage = exports.secureStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
require('module-alias/register');
const localStorage_1 = require("./localStorage");
Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
const sessionStorage_1 = require("./sessionStorage");
Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
const cookieStorage_1 = require("./cookieStorage");
Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
const memoryStorage_1 = require("./memoryStorage");
Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return memoryStorage_1.memoryStorage; } });
const secureStorage_1 = require("./secureStorage");
Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return secureStorage_1.secureStorage; } });
const vuexStorage_1 = require("./vuexStorage");
Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return vuexStorage_1.vuexStorage; } });
const piniaStorage_1 = require("./piniaStorage");
Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return piniaStorage_1.piniaStorage; } });
const gunStorage_1 = require("./gunStorage");
Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
const configStorage_1 = require("./configStorage");
Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return configStorage_1.configStorage; } });
const idbStorage_1 = require("./idbStorage");
Object.defineProperty(exports, "idbStorage", { enumerable: true, get: function () { return idbStorage_1.idbStorage; } });
const webqlStorage_1 = require("./webqlStorage");
Object.defineProperty(exports, "webqlStorage", { enumerable: true, get: function () { return webqlStorage_1.webqlStorage; } });
exports.uStore = {
    config: configStorage_1.configStorage,
    cookie: cookieStorage_1.cookieStorage,
    gun: gunStorage_1.gunStorage,
    local: localStorage_1.localStorage,
    memory: memoryStorage_1.memoryStorage,
    pinia: piniaStorage_1.piniaStorage,
    secure: secureStorage_1.secureStorage,
    session: sessionStorage_1.sessionStorage,
    vuex: vuexStorage_1.vuexStorage,
    idb: idbStorage_1.idbStorage,
    webql: webqlStorage_1.webqlStorage,
};
//# sourceMappingURL=index.js.map