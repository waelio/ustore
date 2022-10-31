"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = exports.Config = exports.isProcess = void 0;
var path_1 = __importDefault(require("path"));
var isProcess = function () {
    try {
        return process["browser"];
    }
    catch (error) {
        return false;
    }
};
exports.isProcess = isProcess;
var Config = (function () {
    function Config() {
        this.configPath = path_1.default.join(path_1.default.dirname(__dirname), "../../lib/config");
        this.setEnvironment();
        var _ = this;
        this._server = _.getServerVars();
        this._client = _.getClientVars();
        this._dev = _.getUrgentOverrides();
        this._store = Object.assign({}, __assign({}, _._client), __assign({}, _._server), __assign({}, _._dev), { client: _._client }, { server: _._server }, { dev: _._dev });
    }
    Config.prototype.set = function (key, value) {
        if (key.match(/:/)) {
            var keys_1 = key.split(":");
            var storeKey_1 = this._store;
            keys_1.forEach(function (k, i) {
                if (keys_1.length === i + 1) {
                    storeKey_1[k] = value;
                }
                if (storeKey_1[k] === undefined) {
                    storeKey_1[k] = {};
                }
                storeKey_1 = storeKey_1[k];
            });
        }
        else {
            this._store[key] = value;
        }
    };
    Config.prototype.getAll = function () {
        return this._store;
    };
    Config.prototype.getItem = function (key) {
        return this._store[key];
    };
    Config.prototype.get = function (key) {
        if (key.match(/:/)) {
            var storeKey = this.buildNestedKey(key);
            return storeKey;
        }
        return this._store[key];
    };
    Config.prototype.client = function () {
        return this.getItem("client");
    };
    Config.prototype.dev = function () {
        return this.getItem("dev");
    };
    Config.prototype.server = function () {
        return this.getItem("server");
    };
    Config.prototype.store = function () {
        return this._store;
    };
    Config.prototype.has = function (key) {
        return Boolean(this.get(key));
    };
    Config.prototype.setEnvironment = function () {
        if (process && process["browser"]) {
            this._env = "client";
        }
        else {
            this._env = "server";
        }
    };
    Config.prototype.getServerVars = function () {
        var serverVars = {};
        if (this._env === "server") {
            try {
                var serverPath = path_1.default.join(__dirname, "/config/server.ts");
                serverVars = require(serverPath);
            }
            catch (e) {
                if (process.env.NODE_ENV === "development") {
                    console.warn("Could not find a server.js config in `./config`.");
                }
            }
        }
        return serverVars;
    };
    Config.prototype.getClientVars = function () {
        try {
            return require(this.configPath + "/client");
        }
        catch (e) {
            if (process.env.NODE_ENV === "development") {
                console.warn("Didn't find a client config in `./config`.");
            }
        }
    };
    Config.prototype.getUrgentOverrides = function () {
        var overrides;
        var filename = process.env.NODE_ENV === "production" ? "prod" : "dev";
        try {
            overrides = require("".concat(this.configPath, "/").concat(filename));
            console.log("FYI: data in `./config/".concat(filename, ".js` file will override Server & Client equal data/values."));
        }
        catch (e) {
            overrides = {};
        }
        return overrides;
    };
    Config.prototype.buildNestedKey = function (nestedKey) {
        var keys = nestedKey.split(":");
        var storeKey = this._store;
        keys.forEach(function (k) {
            try {
                storeKey = storeKey[k];
            }
            catch (e) {
                return undefined;
            }
        });
        return storeKey;
    };
    return Config;
}());
exports.Config = Config;
exports.configStorage = new Config();
exports.default = exports.configStorage;
//# sourceMappingURL=configStorage.js.map