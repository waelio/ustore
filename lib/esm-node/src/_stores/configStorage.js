import CONFIG from "../config/index.js";
const ENV_CLIENT = "client";
const ENV_SERVER = "server";
export const isProcess = () => {
    try {
        return typeof window === "undefined";
    }
    catch {
        return true;
    }
};
export class Config {
    constructor() {
        this._env = ENV_SERVER;
        this.setEnvironment();
        const clientVars = this.getClientVars();
        const serverVars = this.getServerVars();
        const overrides = this.getUrgentOverrides();
        this._store = {
            ...clientVars,
            ...serverVars,
            ...overrides,
            client: clientVars,
            server: serverVars,
            dev: overrides,
        };
    }
    set(key, value) {
        if (key.includes(":")) {
            const keys = key.split(":");
            let storeKey = this._store;
            keys.forEach((k, i) => {
                if (i === keys.length - 1) {
                    storeKey[k] = value;
                }
                else {
                    storeKey[k] = storeKey[k] || {};
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
        if (key.includes(":")) {
            return this.buildNestedKey(key);
        }
        return this._store[key];
    }
    client() {
        return this.getItem(ENV_CLIENT);
    }
    dev() {
        return this.getItem("dev");
    }
    server() {
        return this.getItem(ENV_SERVER);
    }
    store() {
        return this._store;
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    setEnvironment() {
        this._env = typeof window !== "undefined" ? ENV_CLIENT : ENV_SERVER;
    }
    getServerVars() {
        if (this._env === ENV_SERVER) {
            try {
                return CONFIG().server || {};
            }
            catch {
                console.warn("Could not find a server.js config in `./config`.");
            }
        }
        return {};
    }
    getClientVars() {
        try {
            return CONFIG().client || {};
        }
        catch {
            console.warn("Didn't find a client config in `./config`.");
        }
        return {};
    }
    getUrgentOverrides() {
        const filename = isProcess() && ["production", "prod"].includes(process.env.NODE_ENV || "")
            ? "prod"
            : "dev";
        try {
            return CONFIG()[filename] || {};
        }
        catch {
            return {};
        }
    }
    buildNestedKey(nestedKey) {
        const keys = nestedKey.split(":");
        let storeKey = this._store;
        for (const k of keys) {
            if (storeKey[k] === undefined) {
                return undefined;
            }
            storeKey = storeKey[k];
        }
        return storeKey;
    }
}
const configStorage = new Config();
export { configStorage };
export default configStorage;
//# sourceMappingURL=configStorage.js.map