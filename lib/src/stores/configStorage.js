"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = exports.Config = exports.isProcess = void 0;
const path_1 = __importDefault(require("path"));
const isProcess = () => {
    try {
        return process['browser'];
    }
    catch (error) {
        return false;
    }
};
exports.isProcess = isProcess;
class Config {
    constructor() {
        this.configPath = path_1.default.join(path_1.default.dirname(__dirname), '..', 'config/');
        this.setEnvironment();
        const _ = this;
        this._server = _.getServerVars();
        this._client = _.getClientVars();
        this._dev = _.getUrgentOverrides();
        this._store = Object.assign({}, Object.assign({}, _._client), Object.assign({}, _._server), Object.assign({}, _._dev), { client: _._client }, { server: _._server }, { dev: _._dev });
    }
    set(key, value) {
        if (key.match(/:/)) {
            const keys = key.split(':');
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
        return this.getItem('client');
    }
    dev() {
        return this.getItem('dev');
    }
    server() {
        return this.getItem('server');
    }
    store() {
        return this._store;
    }
    has(key) {
        return Boolean(this.get(key));
    }
    setEnvironment() {
        if (process && process['browser']) {
            this._env = 'client';
        }
        else {
            this._env = 'server';
        }
    }
    getServerVars() {
        let serverVars = {};
        if (this._env === 'server') {
            try {
                const serverPath = this.configPath + 'server.ts';
                serverVars = require(serverPath);
            }
            catch (e) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('Could not find a server.js config in `./config`.');
                }
            }
        }
        return serverVars;
    }
    getClientVars() {
        try {
            const client = require(this.configPath + 'client');
            return client;
        }
        catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.warn("Didn't find a client config in `./config`.");
            }
        }
    }
    getUrgentOverrides() {
        let overrides;
        const filename = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
        try {
            overrides = require(`${this.configPath}${filename}`);
            console.log(`FYI: data in \`./config/${filename}.js\` file will override Server & Client equal data/values.`);
        }
        catch (e) {
            overrides = {};
        }
        return overrides;
    }
    buildNestedKey(nestedKey) {
        const keys = nestedKey.split(':');
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
exports.configStorage = new Config();
exports.default = exports.configStorage;
//# sourceMappingURL=configStorage.js.map