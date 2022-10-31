/* eslint-disable @typescript-eslint/ban-types */
import { UStoreClass } from "../.d";
import path from "path";
import { _to } from "waelio-utils";
const __dirname = path.resolve();

// path.exists('/config', function (exists) { console.log("Does the file exist?", exists) })


  

export class Config {
  configPath: string;
  [x: string]: {} | Promise<unknown> | Promise<string> | Promise<Function>;
  _store: Partial<UStoreClass>;
  constructor() {
    const ConfigPath = path.join(path.dirname(__dirname), "/ustore/lib/config");
    this.configPath = ConfigPath;
    this.setEnvironment();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _ = this;
    this._server = _.getServerVars(); /**? */
    this._client = _.getClientVars(); /**? */
    this._dev = _.getUrgentOverrides(); /**? */    
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
  isProcess() {
    try {
        return process['browser'] as unknown;
      } catch (error) {
        return false;
      }
  }
  /**
   *
   * @param key
   * @param value
   */
  set(key: string, value: unknown): void {
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
    if (process && process["browser"]) {
      this._env = "client";
    } else {
      this._env = "server";
    }
  }

  /**
   * Internal inistializalion
   */
  async getServerVars() {
    if (this._env === "server") {
      try {
        const serverPath = this.configPath + "/server.js";
        const serverVars = await import(serverPath);
        const [error, success] = await _to(serverVars);
        if (error) {
          throw error;
        }
        return success as unknown as string[];
      } catch (e: unknown) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Could not find a server.js config in `./config`.");
        }
      }
    }
  }
  /**
   * Internal inistializalion
   */
  async getClientVars() {
    try {
      const newPathName = this.configPath + "/client.js";
      const myClient = await import(newPathName);
      const [error, success] = await _to(myClient);
      if (error) {
        throw error;
      }
      return success;
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Didn't find a client config in `./config`.");
      }
    }
  }
  /**
   * Internal inistializalion
   */
  getUrgentOverrides() {
    const SV = this;
    let overrides: {};
    function fixName(name: string): string {
      const res = SV.configPath + "/" + name + ".js";
      return res;
    }
    const filename = process.env.NODE_ENV === "production" ? "prod" : "dev";
    try {
      overrides = import(fixName(filename)); /**? */
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
