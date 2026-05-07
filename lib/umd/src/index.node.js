(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_stores/localStorage", "./_stores/sessionStorage", "./_stores/cookieStorage", "./_stores/memoryStorage", "./_stores/vuexStorage", "./_stores/piniaStorage", "./_stores/gunStorage", "./_stores/secureStorage", "./_stores/configStorage", "./_stores/signalStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.signalStorage = exports.configStorage = exports.secureStorage = exports.gunStorage = exports.vuexStorage = exports.memoryStorage = exports.cookieStorage = exports.sessionStorage = exports.localStorage = exports.uStore = void 0;
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
    const gunStorage_1 = require("./_stores/gunStorage");
    Object.defineProperty(exports, "gunStorage", { enumerable: true, get: function () { return gunStorage_1.gunStorage; } });
    const secureStorage_1 = require("./_stores/secureStorage");
    Object.defineProperty(exports, "secureStorage", { enumerable: true, get: function () { return secureStorage_1.secureStorage; } });
    const configStorage_1 = require("./_stores/configStorage");
    Object.defineProperty(exports, "configStorage", { enumerable: true, get: function () { return configStorage_1.configStorage; } });
    const signalStorage_1 = require("./_stores/signalStorage");
    Object.defineProperty(exports, "signalStorage", { enumerable: true, get: function () { return signalStorage_1.signalStorage; } });
    const gunPlaceholder = new Proxy({}, {
        get() {
            throw new Error("uStore.gun is unavailable in native Node ESM entry. Use CommonJS require() or a bundler to access Gun storage.");
        },
        apply() {
            throw new Error("uStore.gun is unavailable in native Node ESM entry. Use CommonJS require() or a bundler to access Gun storage.");
        },
    });
    exports.uStore = {
        config: configStorage_1.configStorage,
        cookie: cookieStorage_1.cookieStorage,
        gun: gunPlaceholder,
        local: localStorage_1.localStorage,
        memory: memoryStorage_1.memoryStorage,
        pinia: piniaStorage_1.piniaStorage,
        secure: secureStorage_1.secureStorage,
        session: sessionStorage_1.sessionStorage,
        vuex: vuexStorage_1.vuexStorage,
        signal: signalStorage_1.signalStorage,
    };
    exports.default = exports.uStore;
    if (typeof window !== "undefined") {
        window["uStore"] = exports.uStore;
    }
    else {
        globalThis["uStore"] = exports.uStore;
    }
});
//# sourceMappingURL=index.node.js.map