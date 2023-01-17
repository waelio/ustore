"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStorage = void 0;
const store2_1 = __importDefault(require("store2"));
const session = store2_1.default.session.namespace("uStore:sessionStorage");
exports.sessionStorage = {
    get: (key) => session.getAll,
    getItem: (key) => session.get(key),
    set: (key, value) => session.set(key, value),
    setItem: (key, value) => session.set(key, value),
    has: (key) => Boolean(session.get(key)),
    remove: (key) => session.remove(key),
};
exports.default = exports.sessionStorage;
//# sourceMappingURL=sessionStorage.js.map