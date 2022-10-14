import { UStoreClass } from '../.d';
class Config {
  [x: string]: any;
  _store: UStoreClass;
  constructor() {
    this.setEnvironment();
    const _ = this
    this._server = _.getServerVars();
    this._client = _.getClientVars();
    this._dev = _.getUrgentOverrides();

    this._store = Object.assign(
      {},
      { ..._._client.default },
      { ..._._server.default },
      { ..._._dev.default },
      { client: _._client.default },
      { server: _._server.default },
      { dev: _._dev.default }
    );
  }

  set(key: string, value: any) {
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
    } else {
      this._store[key] = value;
    }
  }

  getAll() {
    return this._store;
  }

  getItem(key: string) {
    return this._store[key];
  }

  get(key: string) {
    if (key.match(/:/)) {
      const storeKey = this.buildNestedKey(key);
      return storeKey;
    }

    // Return regular key
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

  has(key: string) {
    return Boolean(this.get(key));
  }

  setEnvironment() {
    if (process && process['browser']) {
      this._env = 'client';
    } else {
      this._env = 'server';
    }
  }

  getServerVars() {
    let serverVars = {};

    if (this._env === 'server') {
      try {
        serverVars = require('../config/server');
      } catch (e: any) {
        if (process.env.NODE_ENV === 'development') {
          console.warn("Didn't find a server config in `./config`.");
        }
      }
    }

    return serverVars;
  }

  getClientVars() {
    let clientVars: { [key: string]: any };

    try {
      clientVars = require('../config/client');
    } catch (e) {
      clientVars = {};

      if (process.env.NODE_ENV === 'development') {
        console.warn("Didn't find a client config in `./config`.");
      }
    }

    return clientVars;
  }

  getUrgentOverrides() {
    let overrides;
    const filename = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    try {
      overrides =
        process.env.NODE_ENV === 'production'
          ? require('../config/prod')
          : require('../config/dev');

      // console.log(`FYI: data in \`./config/${filename}.js\` file will override Server & Client equal data/values.`);
    } catch (e) {
      overrides = {};
    }

    return overrides;
  }

  buildNestedKey(nestedKey: string) {
    const keys = nestedKey.split(':');
    let storeKey = this._store;

    keys.forEach(function (k: string) {
      try {
        storeKey = storeKey[k];
      } catch (e) {
        return undefined;
      }
    });

    return storeKey;
  }
}
/**
 * Waelio Universal Storage config
 * See README for documentations.
 */
const configStorage = new Config();
export { configStorage };
export default configStorage;
