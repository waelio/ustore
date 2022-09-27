"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uStore = void 0;
var localStorage_1 = require("./stores/localStorage");
var sessionStorage_1 = require("./stores/sessionStorage");
var cookieStorage_1 = require("./stores/cookieStorage");
var memoryStorage_1 = require("./stores/memoryStorage");
var vuexStorage_1 = require("./stores/vuexStorage");
var piniaStorage_1 = require("./stores/piniaStorage");
var gunStorage_1 = require("./stores/gunStorage");
var uStore = function () { return ({
    local: localStorage_1.localStorage,
    session: sessionStorage_1.sessionStorage,
    cookie: cookieStorage_1.cookieStorage,
    memory: memoryStorage_1.memoryStorage,
    vuex: vuexStorage_1.vuexStorage,
    pinia: piniaStorage_1.piniaStorage,
    gun: gunStorage_1.gunStorage
}); };
exports.uStore = uStore;
exports.default = uStore;
try {
    if (window && !window['uStore']) {
        window['uStore'] = uStore;
    }
}
catch (err) {
    console.log('Oops, `window` is not defined');
}
//# sourceMappingURL=index.js.map