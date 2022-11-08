(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorePlugins = exports.StoreTypes = void 0;
    var StoreTypes;
    (function (StoreTypes) {
        StoreTypes["local"] = "localStorage";
        StoreTypes["session"] = "sessionStorage";
        StoreTypes["cookie"] = "cookieStorage";
        StoreTypes["memory"] = "memoryStorage";
        StoreTypes["vuex"] = "vuexStorage";
        StoreTypes["pinia"] = "piniaStorage";
        StoreTypes["gun"] = "gunStorage";
    })(StoreTypes = exports.StoreTypes || (exports.StoreTypes = {}));
    var StorePlugins;
    (function (StorePlugins) {
        StorePlugins["local"] = "localStorage";
        StorePlugins["session"] = "sessionStorage";
        StorePlugins["cookie"] = "cookieStorage";
        StorePlugins["memory"] = "memoryStorage";
        StorePlugins["vuex"] = "vuexStorage";
        StorePlugins["pinia"] = "piniaStorage";
        StorePlugins["gun"] = "gunStorage";
    })(StorePlugins = exports.StorePlugins || (exports.StorePlugins = {}));
});
//# sourceMappingURL=types.js.map