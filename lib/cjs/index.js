"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
var localStorage_1 = require("./stores/localStorage");
Object.defineProperty(exports, "localStorage", { enumerable: true, get: function () { return localStorage_1.localStorage; } });
var sessionStorage_1 = require("./stores/sessionStorage");
Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return sessionStorage_1.sessionStorage; } });
var cookieStorage_1 = require("./stores/cookieStorage");
Object.defineProperty(exports, "cookieStorage", { enumerable: true, get: function () { return cookieStorage_1.cookieStorage; } });
var memoryStorage_1 = require("./stores/memoryStorage");
Object.defineProperty(exports, "memoryStorage", { enumerable: true, get: function () { return memoryStorage_1.memoryStorage; } });
var vuexStorage_1 = require("./stores/vuexStorage");
Object.defineProperty(exports, "vuexStorage", { enumerable: true, get: function () { return vuexStorage_1.vuexStorage; } });
var piniaStorage_1 = require("./stores/piniaStorage");
Object.defineProperty(exports, "piniaStorage", { enumerable: true, get: function () { return piniaStorage_1.piniaStorage; } });
var gunStorage_1 = require("./stores/gunStorage");
Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
var configStorage_1 = require("./stores/configStorage");
Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return configStorage_1.configStorage; } });
exports.uStore = {
    local: function () { return localStorage_1.localStorage; },
    session: function () { return sessionStorage_1.sessionStorage; },
    cookie: function () { return cookieStorage_1.cookieStorage; },
    memory: function () { return memoryStorage_1.memoryStorage; },
    vuex: function () { return vuexStorage_1.vuexStorage; },
    pinia: function () { return piniaStorage_1.piniaStorage; },
    gun: function () { return gunStorage_1.gunStorage; },
    config: configStorage_1.configStorage,
};
exports.default = exports.uStore;
try {
    if (window && !window["uStore"]) {
        window["uStore"] = exports.uStore;
    }
}
catch (err) {
    console.log("Oops, `window` is not defined");
}
//# sourceMappingURL=index.js.map