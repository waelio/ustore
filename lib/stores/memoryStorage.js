"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryStorage = void 0;
var memoryStore = {};
exports.memoryStorage = ({
    get: function (key) { return memoryStore[key] ? memoryStore[key] : key; },
    set: function (key, value) {
        memoryStore[key] = value;
        return true;
    },
    remove: function (key) {
        memoryStore[key] ? delete memoryStore[key] : null;
        return true;
    },
});
//# sourceMappingURL=memoryStorage.js.map