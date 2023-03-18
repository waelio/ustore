"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = exports.Config = exports.isProcess = void 0;
const config_1 = __importDefault(require("../config"));
const isProcess = () => {
    try {
        return typeof process !== undefined && process["browser"]
            ? process["browser"]
            : false;
    }
    catch (error) {
        return false;
    }
};
exports.isProcess = isProcess;
class Config {
    constructor() {
        this.setEnvironment();
        const _ = this;
        this._server = _.getServerVars();
        this._client = _.getClientVars();
        this._dev = _.getUrgentOverrides();
        this._store = Object.assign({}, { ..._._client }, { ..._._server }, { ..._._dev }, { client: _._client }, { server: _._server }, { dev: _._dev });
    }
    set(key, value) {
        if (key.match(/:/)) {
            const keys = key.split(":");
            let storeKey = this._store;
            keys.forEach(function (k, i) {
                if (keys.length === i + 1) {
                    storeKey[k] = value;
                }
                if (storeKey[k] === undefined) {
                    storeKey[k] = {};
                }
                storeKey = storeKey[k];
            });
        }
        else {
            this._store[key] = value;
        }
    }
    getAll() {
        return this._store;
    }
    getItem(key) {
        return this._store[key];
    }
    get(key) {
        if (key.match(/:/)) {
            const storeKey = this.buildNestedKey(key);
            return storeKey;
        }
        return this._store[key];
    }
    client() {
        return this.getItem("client");
    }
    dev() {
        return this.getItem("dev");
    }
    server() {
        return this.getItem("server");
    }
    store() {
        return this._store;
    }
    has(key) {
        return Boolean(this.get(key));
    }
    setEnvironment() {
        if ((0, exports.isProcess)() && process["browser"]) {
            this._env = "client";
        }
        else {
            this._env = "server";
        }
    }
    getServerVars() {
        let serverVars = {};
        if (this._env === "server") {
            try {
                serverVars = (0, config_1.default)().server;
            }
            catch (e) {
                console.log("Could not find a server.js config in `./config`.");
            }
        }
        return serverVars;
    }
    getClientVars() {
        let client = {};
        try {
            const payload = (0, config_1.default)().client;
            client = { ...payload };
        }
        catch (e) {
            console.log("Didn't find a client config in `./config`.");
        }
        return client;
    }
    getUrgentOverrides() {
        let overrides;
        const filename = (0, exports.isProcess)() &&
            ["production", "prod"].includes(process.env.NODE_ENV)
            ? "prod"
            : "dev";
        try {
            overrides = (0, config_1.default)()[filename];
        }
        catch (e) {
            overrides = {};
        }
        return overrides;
    }
    buildNestedKey(nestedKey) {
        const keys = nestedKey.split(":");
        let storeKey = this._store;
        keys.forEach(function (k) {
            try {
                storeKey = storeKey[k];
            }
            catch (e) {
                return undefined;
            }
        });
        return storeKey;
    }
}
exports.Config = Config;
const configStorage = new Config();
exports.configStorage = configStorage;
exports.default = configStorage;
//# sourceMappingURL=configStorage.js.map