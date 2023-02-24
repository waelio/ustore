"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.prod = exports.dev = exports.client = exports.server = void 0;
const client_1 = __importDefault(require("./client"));
exports.client = client_1.default;
const dev_1 = __importDefault(require("./dev"));
exports.dev = dev_1.default;
const prod_1 = __importDefault(require("./prod"));
exports.prod = prod_1.default;
const server_1 = __importDefault(require("./server"));
exports.server = server_1.default;
const CONFIG = () => ({ server: server_1.default, client: client_1.default, dev: dev_1.default, prod: prod_1.default });
exports.CONFIG = CONFIG;
exports.default = CONFIG;
//# sourceMappingURL=index.js.map