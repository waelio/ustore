(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./stores/localStorage", "./stores/sessionStorage", "./stores/cookieStorage", "./stores/memoryStorage", "./stores/vuexStorage", "./stores/piniaStorage", "./stores/gunStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gunStorage = exports.piniaStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
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
    exports.uStore = {
        local: localStorage_1.localStorage,
        session: sessionStorage_1.sessionStorage,
        cookie: cookieStorage_1.cookieStorage,
        memory: memoryStorage_1.memoryStorage,
        vuex: vuexStorage_1.vuexStorage,
        pinia: piniaStorage_1.piniaStorage,
        gun: gunStorage_1.gunStorage,
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