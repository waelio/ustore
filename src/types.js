export var StoreTypes;
(function (StoreTypes) {
    StoreTypes["local"] = "localStorage";
    StoreTypes["session"] = "sessionStorage";
    StoreTypes["cookie"] = "cookieStorage";
    StoreTypes["memory"] = "memoryStorage";
    StoreTypes["vuex"] = "vuexStorage";
    StoreTypes["pinia"] = "piniaStorage";
    StoreTypes["gun"] = "gunStorage";
})(StoreTypes || (StoreTypes = {}));
//# sourceMappingURL=types.js.map