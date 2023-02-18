var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./server", "./client", "./dev", "./prod"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prod = exports.dev = exports.client = exports.server = void 0;
    const server_1 = __importDefault(require("./server"));
    exports.server = server_1.default;
    const client_1 = __importDefault(require("./client"));
    exports.client = client_1.default;
    const dev_1 = __importDefault(require("./dev"));
    exports.dev = dev_1.default;
    const prod_1 = __importDefault(require("./prod"));
    exports.prod = prod_1.default;
});
//# sourceMappingURL=index.js.map