"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uStoreStorage = exports.createApp = exports.app = void 0;
const vue_1 = require("vue");
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return vue_1.createApp; } });
const memoryStorage_1 = require("./memoryStorage");
const secureStorage_1 = require("./secureStorage");
const sessionStorage_1 = require("./sessionStorage");
const configStorage_1 = require("./configStorage");
const cookieStorage_1 = require("./cookieStorage");
const gunStorage_1 = require("./gunStorage");
const idbStorage_1 = require("./idbStorage");
const localStorage_1 = require("./localStorage");
const piniaStorage_1 = require("./piniaStorage");
const vuexStorage_1 = require("./vuexStorage");
const webqlStorage_1 = require("./webqlStorage");
exports.app = (0, vue_1.createApp)({});
exports.uStoreStorage = ({
    config: configStorage_1.configStorage,
    cookie: cookieStorage_1.cookieStorage,
    gun: gunStorage_1.gunStorage,
    idb: idbStorage_1.idbStorage,
    local: localStorage_1.localStorage,
    memory: memoryStorage_1.memoryStorage,
    pinia: piniaStorage_1.piniaStorage,
    secure: secureStorage_1.secureStorage,
    session: sessionStorage_1.sessionStorage,
    vuex: vuexStorage_1.vuexStorage,
    wql: webqlStorage_1.webqlStorage
});
exports.default = exports.uStoreStorage;
//# sourceMappingURL=uStoreStorage.js.map