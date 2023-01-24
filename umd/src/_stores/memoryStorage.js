(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.memoryStorage = void 0;
    const index_1 = require("../core/index");
    let memoryStore = new index_1.UCORE();
    exports.memoryStorage = memoryStore;
});
//# sourceMappingURL=memoryStorage.js.map