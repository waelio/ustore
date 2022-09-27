"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorage = void 0;
var store2_1 = __importDefault(require("store2"));
var local = store2_1.default.local.namespace('uStore');
exports.localStorage = {
    get: function (key) {
        try {
            return local(key);
        }
        catch (error) {
            return error || null;
        }
    },
    set: function (key, value) {
        try {
            return local(key, value);
        }
        catch (error) {
            return error || null;
        }
    },
    remove: function (key) {
        try {
            return local.remove(key);
        }
        catch (error) {
            return error || null;
        }
    }
};
//# sourceMappingURL=localStorage.js.map