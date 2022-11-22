(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./uStoreStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.memoryStorage = void 0;
    const memoryStore = {};
    const options = {
        client: true,
        server: true,
        dev: true,
        prod: true,
        plugin: true,
    };
    const uStoreStorage_1 = require("./uStoreStorage");
    exports.memoryStorage = new uStoreStorage_1.IUStoreClass(memoryStore, options);
    exports.default = exports.memoryStorage;
});
//# sourceMappingURL=memoryStorage.js.map