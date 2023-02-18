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
        serverVars = require("../config/server");
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
    let client = {};
    try {
      const payload = require("../config/client").default;
      client = { ...payload };
    } catch (e) {
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
              businessImage:
                "https://pbs.twimg.com/media/B6dQuW5IIAIgHCO?format=jpg&name=medium",
              businessDescription:
                "Nostrud reprehenderit voluptate sit irure laboris sunt irure fugiat sit tempor.",
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
  /**
   * Internal inistializalion
   */
  getUrgentOverrides() {
    let overrides: {};
    const filename = process.env.NODE_ENV === "production" ? "prod" : "dev";
    try {
      overrides = require(`../config/${filename}`); /**? */

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
const configStorage = new Config();
export { configStorage };

export default configStorage as ConfigStorage;
