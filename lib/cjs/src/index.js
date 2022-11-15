"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webqlStorage = exports.idbStorage = exports.configStorage = exports.secureStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
const localStorage_1 = require("./stores/localStorage");
Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
const sessionStorage_1 = require("./stores/sessionStorage");
Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
const cookieStorage_1 = require("./stores/cookieStorage");
Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
const memoryStorage_1 = require("./stores/memoryStorage");
Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return memoryStorage_1.memoryStorage; } });
const vuexStorage_1 = require("./stores/vuexStorage");
Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return vuexStorage_1.vuexStorage; } });
const piniaStorage_1 = require("./stores/piniaStorage");
Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return piniaStorage_1.piniaStorage; } });
const gunStorage_1 = require("./stores/gunStorage");
Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
const stores_1 = require("./stores");
Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return stores_1.secureStorage; } });
const stores_2 = require("./stores");
Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return stores_2.configStorage; } });
const stores_3 = require("./stores");
Object.defineProperty(exports, "idbStorage", { enumerable: true, get: function () { return stores_3.idbStorage; } });
const stores_4 = require("./stores");
Object.defineProperty(exports, "webqlStorage", { enumerable: true, get: function () { return stores_4.webqlStorage; } });
exports.uStore = {
    local: localStorage_1.localStorage,
    session: sessionStorage_1.sessionStorage,
    cookie: cookieStorage_1.cookieStorage,
    memory: memoryStorage_1.memoryStorage,
    vuex: vuexStorage_1.vuexStorage,
    pinia: piniaStorage_1.piniaStorage,
    gun: gunStorage_1.gunStorage,
    secure: stores_1.secureStorage,
    config: stores_2.configStorage,
    idb: stores_3.idbStorage,
    wsbl: stores_4.webqlStorage,
};
exports.default = exports.uStore;
if (typeof window !== "undefined") {
    window["uStore"] = exports.uStore;
}
else {
    globalThis["uStore"] = exports.uStore;
}
//# sourceMappingURL=index.js.map