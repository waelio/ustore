"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorage = void 0;
const store2_1 = __importDefault(require("store2"));
const local = store2_1.default.namespace("uStore");
exports.localStorage = {
    get: (key) => {
        try {
            return local.get(key);
        }
        catch (error) {
            return error || null;
        }
    },
    set: (key, value) => {
        try {
            return local.set(key, value);
        }
        catch (error) {
            return error || null;
        }
    },
    remove: (key) => {
        try {
            return local.remove(key);
        }
        catch (error) {
            return error || null;
        }
    },
};
exports.default = exports.localStorage;
//# sourceMappingURL=localStorage.js.map