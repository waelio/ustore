"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const client_1 = __importDefault(require("./client"));
const dev_1 = __importDefault(require("./dev"));
const prod_1 = __importDefault(require("./prod"));
const server_1 = __importDefault(require("./server"));
const CONFIG = () => ({ server: server_1.default, client: client_1.default, dev: dev_1.default, prod: prod_1.default });
exports.CONFIG = CONFIG;
exports.default = CONFIG;
//# sourceMappingURL=index.js.map