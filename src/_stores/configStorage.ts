/* eslint-disable @typescript-eslint/ban-types */
import { UStoreClass } from "../.d";
// const require = createRequire(import.meta.url);

export const isProcess = (): unknown | boolean => {
  try {
    return process["browser"] as unknown;
  } catch (error) {
    return false;
  }
};
export class Config {
  [x: string]: {};
  _store: Partial<UStoreClass>;
  constructor() {
    this.setEnvironment();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _ = this;
    this._server = _.getServerVars(); /**?*/
    this._client = _.getClientVars(); /*?*/
    this._dev = _.getUrgentOverrides(); /*?*/

    this._store = Object.assign(
      {},
      { ..._._client },
      { ..._._server },
      { ..._._dev },
      { client: _._client },
      { server: _._server },
      { dev: _._dev }
    );
  }

  /**
   *
   * @param key
   * @param value
   */
  set(key: string, value: unknown) {
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
    } else {
      this._store[key] = value;
    }
  }
  /**
   * Get all store values
   */
  getAll() {
    return this._store;
  }

  /**
   * Gte a single value
   * @param key
   */
  getItem(key: string) {
    return this._store[key];
  }
  /**
   * Get key from nestedKey :
   * @param key
   */
  get(key: string) {
    if (key.match(/:/)) {
      const storeKey = this.buildNestedKey(key);
      return storeKey;
    }

    // Return regular key
    return this._store[key];
  }

  /**
   * get all client store
   */
  client() {
    return this.getItem("client");
  }

  /**
   * get all dev store
   */
  dev() {
    return this.getItem("dev");
  }

  /**
   * get all server store
   */
  server() {
    return this.getItem("server");
  }

  /**
   * got all values from store
   */
  store() {
    return this._store;
  }

  /**
   * Check if a key exists
   * @param key
   * @return Boolean
   */
  has(key: string) {
    return Boolean(this.get(key));
  }

  /**
   * Internal inistializalion
   */
  setEnvironment() {
    if (!!process && process["browser"]) {
      this._env = "client";
    } else {
      this._env = "server";
    }
  }

  /**
   * Internal inistializalion
   */
  getServerVars() {
    let serverVars = {};

    if (this._env === "server") {
      try {
        const serverPath = "../../config/server.ts";
        serverVars = require(serverPath);
      } catch (e: unknown) {
        if (!!process && process.env.NODE_ENV === "development") {
          console.warn("Could not find a server.js config in `./config`.");
        }
      }
    }
    return serverVars;
  }
  /**
   * Internal inistializalion
   */
  getClientVars() {
    try {
      const client = require("../../config/client");
      return client; /*? */
    } catch (e) {
      if (!!process && process.env.NODE_ENV === "development") {
        console.warn("Didn't find a client config in `./config`.");
      }
    }
  }
  /**
   * Internal inistializalion
   */
  getUrgentOverrides() {
    let overrides: {};
    const filename = process.env.NODE_ENV === "production" ? "prod" : "dev";
    try {
      overrides = require(`../../config/${filename}`); /**? */

      // console.log(
      //   `FYI: data in \`./config/${filename}.js\` file will override Server & Client equal data/values.`
      // );
    } catch (e) {
      overrides = {};
    }

    return overrides;
  }

  /**
   * Build nested pairs
   * @param nestedKey
   */
  buildNestedKey(nestedKey: string) {
    const keys = nestedKey.split(":");
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

export type ConfigStorage = typeof configStorage;
export const configStorage = new Config();

export default configStorage as ConfigStorage;
const cs = configStorage.client.name
cs //

configStorage.get('dev')/*? */
/*? */