var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../config/server", "../../config/client", "../../config/dev", "../../config/prod"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configStorage = exports.Config = exports.isProcess = void 0;
    const server_1 = __importDefault(require("../../config/server"));
    const client_1 = __importDefault(require("../../config/client"));
    const dev_1 = __importDefault(require("../../config/dev"));
    const prod_1 = __importDefault(require("../../config/prod"));
    const isProcess = () => {
        try {
            return !!process && !!process['browser'];
        }
        catch (error) {
            return false;
        }
    };
    exports.isProcess = isProcess;
    class Config {
        constructor() {
            const _ = this;
            this.setEnvironment();
            this._server = _.getServerVars();
            this._client = client_1.default;
            this._dev = _.getUrgentOverrides();
            this._store = Object.assign({ ..._._client }, { ..._._server }, { ..._._dev }, { client: _._client }, { server: _._server }, { dev: _._dev }, {});
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
            if (!!process && process['browser']) {
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
                    serverVars = server_1.default;
                }
                catch (e) {
                    if (!!process && process.env.NODE_ENV === 'development') {
                        console.warn('Could not find a server.js config in `./config`.');
                    }
                }
            }
            return serverVars;
        }
        getUrgentOverrides() {
            let overrides;
            const filename = !!process && process.env.NODE_ENV === 'production' ? prod_1.default : dev_1.default;
            const info = !!process && process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
            try {
                overrides = filename;
                console.log(`FYI: data in \`./config/${info}.js\` file will override Server & Client equal data/values.`);
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
});
//# sourceMappingURL=configStorage.js.map