var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./client", "./dev", "./prod", "./server"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CONFIG = void 0;
    const client_1 = __importDefault(require("./client"));
    const dev_1 = __importDefault(require("./dev"));
    const prod_1 = __importDefault(require("./prod"));
    const server_1 = __importDefault(require("./server"));
    const CONFIG = () => ({ server: server_1.default, client: client_1.default, dev: dev_1.default, prod: prod_1.default });
    exports.CONFIG = CONFIG;
    exports.default = CONFIG;
});
//# sourceMappingURL=index.js.map