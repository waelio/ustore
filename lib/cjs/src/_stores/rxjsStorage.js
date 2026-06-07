"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rxjsStorage = exports.state = void 0;
const rxjs_1 = require("rxjs");
exports.state = new rxjs_1.BehaviorSubject({});
exports.rxjsStorage = {
    get: (key) => {
        if (!key)
            return null;
        return exports.state.getValue()[key] ?? null;
    },
    getItem: (key) => {
        if (!key)
            return null;
        return exports.state.getValue()[key] ?? null;
    },
    set: (key, value) => {
        if (!key)
            return undefined;
        const currentState = exports.state.getValue();
        exports.state.next({ ...currentState, [key]: value });
        return value?.[key] ?? value;
    },
    setItem: (key, value) => {
        if (!key)
            return undefined;
        const currentState = exports.state.getValue();
        exports.state.next({ ...currentState, [key]: value });
        return value?.[key] ?? value;
    },
    has: (key) => {
        if (!key)
            return false;
        return Object.prototype.hasOwnProperty.call(exports.state.getValue(), key);
    },
    hasItem: (key) => {
        if (!key)
            return false;
        return Object.prototype.hasOwnProperty.call(exports.state.getValue(), key);
    },
    remove: (key) => {
        if (!key)
            return false;
        const currentState = exports.state.getValue();
        const exists = Object.prototype.hasOwnProperty.call(currentState, key);
        if (exists) {
            const newState = { ...currentState };
            delete newState[key];
            exports.state.next(newState);
        }
        return !Object.prototype.hasOwnProperty.call(exports.state.getValue(), key);
    },
    removeItem: (key) => {
        if (!key)
            return false;
        const currentState = exports.state.getValue();
        const exists = Object.prototype.hasOwnProperty.call(currentState, key);
        if (exists) {
            const newState = { ...currentState };
            delete newState[key];
            exports.state.next(newState);
        }
        return !Object.prototype.hasOwnProperty.call(exports.state.getValue(), key);
    },
};
exports.default = exports.rxjsStorage;
//# sourceMappingURL=rxjsStorage.js.map