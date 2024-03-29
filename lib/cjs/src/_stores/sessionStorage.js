"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStorage = void 0;
const store2_1 = __importDefault(require("store2"));
const session = store2_1.default.session.namespace("uStore");
exports.sessionStorage = {
    get: (key) => session.get(key),
    getItem: (key) => session.get(key),
    has: (key) => !!session.get(key),
    hasItem: (key) => !!session.get(key),
    set: (key, value) => session.set(key, value),
    setItem: (key, value) => session.set(key, value),
    remove: (key) => session.remove(key),
    removeItem: (key) => session.remove(key),
};
exports.default = exports.sessionStorage;
//# sourceMappingURL=sessionStorage.js.map