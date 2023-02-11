"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
const localStorage_1 = require("./_stores/localStorage");
Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
const sessionStorage_1 = require("./_stores/sessionStorage");
Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
const cookieStorage_1 = require("./_stores/cookieStorage");
Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
const memoryStorage_1 = require("./_stores/memoryStorage");
Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return memoryStorage_1.memoryStorage; } });
const vuexStorage_1 = require("./_stores/vuexStorage");
Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return vuexStorage_1.vuexStorage; } });
const piniaStorage_1 = require("./_stores/piniaStorage");
Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return piniaStorage_1.piniaStorage; } });
const gunStorage_1 = require("./_stores/gunStorage");
Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
const _stores_1 = require("./_stores");
Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return _stores_1.secureStorage; } });
const configStorage_1 = require("./_stores/configStorage");
exports.uStore = ({
    config: configStorage_1.configStorage,
    cookie: cookieStorage_1.cookieStorage,
    gun: gunStorage_1.gunStorage,
    local: localStorage_1.localStorage,
    memory: memoryStorage_1.memoryStorage,
    pinia: piniaStorage_1.piniaStorage,
    secure: _stores_1.secureStorage,
    session: sessionStorage_1.sessionStorage,
    vuex: vuexStorage_1.vuexStorage,
});
exports.default = exports.uStore;
if (typeof window !== "undefined") {
    window["uStore"] = exports.uStore;
}
else {
    globalThis["uStore"] = exports.uStore;
}
//# sourceMappingURL=index.js.map