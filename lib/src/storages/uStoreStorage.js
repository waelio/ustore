import { createApp } from "vue";
export const app = createApp({});
export { createApp };
export var STATCSTORESNAMES;
(function (STATCSTORESNAMES) {
    STATCSTORESNAMES["SERVER"] = "server";
    STATCSTORESNAMES["CLIENT"] = "client";
    STATCSTORESNAMES["DEV"] = "dev";
    STATCSTORESNAMES["PROD"] = "prod";
})(STATCSTORESNAMES || (STATCSTORESNAMES = {}));
export class IUStoreClass {
    constructor(plugin, options) {
        const _ = this;
        this._server = (options === null || options === void 0 ? void 0 : options.server) ? this._server = options.server : {};
        this._client = (options === null || options === void 0 ? void 0 : options.client) ? options.client : {
            init: false,
            app: {
                businessName: 'MyTest App',
                businessDomain: 'www.testapp.com',
                businessAddress: 'Test 123, Test TS 12345',
                businessEmail: 'test@test.com',
                businessImage: 'https://pbs.twimg.com/media/B6dQuW5IIAIgHCO?format=jpg&name=medium',
                businessDescription: 'Nostrud reprehenderit voluptate sit irure laboris sunt irure fugiat sit tempor.'
            },
            settings: {
                locale: 'en-us',
                darkMode: true
            },
            theming: {
                $primary: '#9c27b0',
                $primaryLightColor: '#d05ce3',
                $primaryTextColor: '#ffffff',
                $secondary: '#7c4dff',
                $secondaryLightColor: '#b47cff',
                $secondaryDarkColor: '#3f1dcb',
                $secondaryTextColor: '#ffffff',
                $accent: '#9C27B0',
                $dark: '#6a0080'
            },
            Credentials: {
                google: {
                    clientId: '',
                    clientPassword: ''
                },
                facebook: {
                    clientId: '',
                    clientPassword: ''
                },
                apple: {
                    clientId: '',
                    clientPassword: ''
                },
                amazon: {
                    clientId: '',
                    clientPassword: ''
                }
            }
        };
        this._dev = (options === null || options === void 0 ? void 0 : options.dev) ? options.dev : {
            debug: false,
            localeName: "locale",
            modeName: "darkMode",
        };
        this._prod = (options === null || options === void 0 ? void 0 : options.prod) ? options.prod : {};
        this._plugin = plugin || {};
        this._store = Object.assign(Object.assign({}, _._client), Object.assign({}, _._server), Object.assign({}, _._dev), { client: _._client }, { server: _._server }, { dev: _._dev }, { prod: _._prod }, Object.assign({}, _._plugin), {});
        this._storage = (options === null || options === void 0 ? void 0 : options.storage) ? options.storage : localStorage;
        this.type = this._store;
        this.store = this._store;
    }
    ;
    set(key, value) {
        if (key.match(/:/)) {
            const keys = key.split(":");
            let _storeKey = this._store;
            keys.forEach(function (k, i) {
                if (keys.length === i + 1) {
                    _storeKey[k] = value;
                }
                if (_storeKey[k] === undefined) {
                    _storeKey[k] = {};
                }
                _storeKey = _storeKey[k];
            });
        }
        else {
            this._store[key] = value;
        }
        this._store[key] = value;
        return this.getItem(key);
    }
    setItem(key, value) {
        if (key.match(/:/)) {
            const keys = key.split(":");
            let _storeKey = this._store;
            keys.forEach(function (k, i) {
                if (keys.length === i + 1) {
                    _storeKey[k] = value;
                }
                if (_storeKey[k] === undefined) {
                    _storeKey[k] = {};
                }
                _storeKey = _storeKey[k];
            });
        }
        else {
            this._store[key] = value;
        }
        this._store[key] = value;
        return this.getItem(key);
    }
    getAll() {
        return this._store;
    }
    length() {
        return Object.keys(this._store).length;
    }
    getItem(key) {
        return this._store[key];
    }
    get(key) {
        return key && (key.match(/:/)) ? this.buildNestedKey(key) : this._store[key];
    }
    remove(key) {
        return delete this._store[key];
    }
    removeItem(key) {
        return delete this._store[key];
    }
    client() {
        return this.getItem(STATCSTORESNAMES.CLIENT);
    }
    dev() {
        return this.getItem(STATCSTORESNAMES.DEV);
    }
    server() {
        return this.getItem(STATCSTORESNAMES.SERVER);
    }
    store() {
        return this._store;
    }
    has(key) {
        return Boolean(this.get(key));
    }
    clear() {
        return this._store = {};
    }
    hasItem(key) {
        return !!(this.get(key));
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
export const uStoreStorage = new IUStoreClass();
export default uStoreStorage;
//# sourceMappingURL=uStoreStorage.js.map