"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = exports.Config = exports.isProcess = void 0;
const isProcess = () => {
    try {
        return process["browser"];
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
        if (!!process && process["browser"]) {
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
                serverVars = require("../config/server");
            }
            catch (e) {
                if (!!process && process.env.NODE_ENV === "development") {
                    console.warn("Could not find a server.js config in `./config`.");
                }
            }
        }
        return serverVars;
    }
    getClientVars() {
        let client = {};
        try {
            const payload = require("../config/client");
            client = { ...payload };
        }
        catch (e) {
            if (!!process && process.env.NODE_ENV === "development") {
                console.warn("Didn't find a client config in `./config`.");
                client = {
                    ...{
                        init: false,
                        app: {
                            businessName: "MyTest App",
                            businessDomain: "www.testapp.com",
                            businessAddress: "Test 123, Test TS 12345",
                            businessEmail: "test@test.com",
                            businessImage: "https://pbs.twimg.com/media/B6dQuW5IIAIgHCO?format=jpg&name=medium",
                            businessDescription: "Nostrud reprehenderit voluptate sit irure laboris sunt irure fugiat sit tempor.",
                        },
                        settings: {
                            locale: "en-us",
                            darkMode: true,
                        },
                        theming: {
                            $primary: "#9c27b0",
                            $primaryLightColor: "#d05ce3",
                            $primaryTextColor: "#ffffff",
                            $secondary: "#7c4dff",
                            $secondaryLightColor: "#b47cff",
                            $secondaryDarkColor: "#3f1dcb",
                            $secondaryTextColor: "#ffffff",
                            $accent: "#9C27B0",
                            $dark: "#6a0080",
                        },
                        Credentials: {
                            google: {
                                clientId: "",
                                clientPassword: "",
                            },
                            facebook: {
                                clientId: "",
                                clientPassword: "",
                            },
                            apple: {
                                clientId: "",
                                clientPassword: "",
                            },
                            amazon: {
                                clientId: "",
                                clientPassword: "",
                            },
                        },
                    },
                };
            }
        }
        return client;
    }
    getUrgentOverrides() {
        let overrides;
        const filename = process.env.NODE_ENV === "production" ? "prod" : "dev";
        try {
            overrides = require(`../config/${filename}`);
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