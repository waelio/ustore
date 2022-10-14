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
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = void 0;
var Config = (function () {
    function Config() {
        this.setEnvironment();
        var _ = this;
        this._server = _.getServerVars();
        this._client = _.getClientVars();
        this._dev = _.getUrgentOverrides();
        this._store = Object.assign({}, __assign({}, _._client.default), __assign({}, _._server.default), __assign({}, _._dev.default), { client: _._client.default }, { server: _._server.default }, { dev: _._dev.default });
    }
    Config.prototype.set = function (key, value) {
        if (key.match(/:/)) {
            var keys_1 = key.split(':');
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
        return this.getItem('client');
    };
    Config.prototype.dev = function () {
        return this.getItem('dev');
    };
    Config.prototype.server = function () {
        return this.getItem('server');
    };
    Config.prototype.store = function () {
        return this._store;
    };
    Config.prototype.has = function (key) {
        return Boolean(this.get(key));
    };
    Config.prototype.setEnvironment = function () {
        if (process && process['browser']) {
            this._env = 'client';
        }
        else {
            this._env = 'server';
        }
    };
    Config.prototype.getServerVars = function () {
        var serverVars = {};
        if (this._env === 'server') {
            try {
                serverVars = require('../config/server');
            }
            catch (e) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn("Didn't find a server config in `./config`.");
                }
            }
        }
        return serverVars;
    };
    Config.prototype.getClientVars = function () {
        var clientVars;
        try {
            clientVars = require('../config/client');
        }
        catch (e) {
            clientVars = {};
            if (process.env.NODE_ENV === 'development') {
                console.warn("Didn't find a client config in `./config`.");
            }
        }
        return clientVars;
    };
    Config.prototype.getUrgentOverrides = function () {
        var overrides;
        var filename = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
        try {
            overrides =
                process.env.NODE_ENV === 'production'
                    ? require('../config/prod')
                    : require('../config/dev');
        }
        catch (e) {
            overrides = {};
        }
        return overrides;
    };
    Config.prototype.buildNestedKey = function (nestedKey) {
        var keys = nestedKey.split(':');
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
exports.configStorage = new Config();
exports.default = exports.configStorage;
//# sourceMappingURL=configStorage.js.map