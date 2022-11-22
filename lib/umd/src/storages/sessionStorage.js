var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "store2", "./uStoreStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sessionStorage = void 0;
    const store2_1 = __importDefault(require("store2"));
    const uStoreStorage_1 = require("./uStoreStorage");
    const session = store2_1.default.session.namespace("uStore:sessionStorage");
    const options = {
        client: true,
        server: true,
        dev: true,
        prod: true,
        plugin: true,
    };
    exports.sessionStorage = new uStoreStorage_1.IUStoreClass(session === null || session === void 0 ? void 0 : session.session, options);
    exports.default = exports.sessionStorage;
});
//# sourceMappingURL=sessionStorage.js.map