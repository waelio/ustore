"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStorage = void 0;
var store2_1 = __importDefault(require("store2"));
var session = store2_1.default.session.namespace('uStore');
exports.sessionStorage = ({
    get: function (key) { return session.get(key); },
    set: function (key, value) { return session.set(key, value); },
    remove: function (key) { return session.remove(key); },
});
exports.default = exports.sessionStorage;
//# sourceMappingURL=sessionStorage.js.map