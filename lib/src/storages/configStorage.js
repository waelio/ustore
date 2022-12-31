import { server, client, dev, prod } from "../../config/index";
export class Config {
    constructor(plugin, options) {
        const _ = this;
        this.setEnvironment();
        this._server = (options === null || options === void 0 ? void 0 : options.server)
            ? options.server
            : _.getServerVars();
        this._client = (options === null || options === void 0 ? void 0 : options.client) ? options.client : client;
        this._dev = (options === null || options === void 0 ? void 0 : options.dev) ? options.dev : _.getUrgentOverrides();
        this._prod = (options === null || options === void 0 ? void 0 : options.prod) ? options.prod : prod;
        this._plugin = plugin || {};
        this._store = Object.assign(Object.assign({}, _._client), Object.assign({}, _._server), Object.assign({}, _._dev), { client: _._client }, { server: _._server }, { dev: _._dev }, { prod: _._prod }, {});
    }
    getENV() {
        return this._env;
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
        if (typeof process !== "undefined" && process["browser"]) {
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
                serverVars = server;
            }
            catch (e) {
                if (typeof process !== "undefined" &&
                    process.env.NODE_ENV === "development") {
                    console.warn("Could not find a server.js config in `./config`.");
                }
            }
        }
        return serverVars;
    }
    getUrgentOverrides() {
        let overrides;
        const filename = typeof process !== "undefined" && process.env.NODE_ENV === "production"
            ? prod
            : dev;
        const info = typeof process !== "undefined" && process.env.NODE_ENV === "production"
            ? "prod"
            : "dev";
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
export const configStorage = new Config();
export default configStorage;
//# sourceMappingURL=configStorage.js.map