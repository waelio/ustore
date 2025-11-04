import CONFIG from "../config";

// Define constants for environment types
const ENV_CLIENT = "client";
const ENV_SERVER = "server";

export const isProcess = (): boolean => {
  try {
    return typeof window === "undefined";
  } catch {
    return true;
  }
};

export class Config {
  [x: string]: unknown;
  private _store: Record<string, unknown>;
  private _env: string = ENV_SERVER;

  constructor() {
    this.setEnvironment();
    this._store = {
      ...this.getClientVars(),
      ...this.getServerVars(),
      ...this.getUrgentOverrides(),
      client: this.getClientVars(),
      server: this.getServerVars(),
      dev: this.getUrgentOverrides(),
    } as Record<string, unknown>;
  }

  set(key: string, value: unknown): void {
    if (key.includes(":")) {
      const keys = key.split(":");
      let storeKey = this._store as Record<string, any>;

      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          storeKey[k] = value;
        } else {
          storeKey[k] = storeKey[k] || {};
        }
        storeKey = storeKey[k] as Record<string, any>;
      });
    } else {
      this._store[key] = value;
    }
  }

  getAll(): Record<string, unknown> {
    return this._store;
  }

  getItem(key: string): unknown {
    return this._store[key];
  }

  get(key: string): unknown {
    if (key.includes(":")) {
      return this.buildNestedKey(key);
    }
    return this._store[key];
  }

  client(): unknown {
    return this.getItem(ENV_CLIENT);
  }

  dev(): unknown {
    return this.getItem("dev");
  }

  server(): unknown {
    return this.getItem(ENV_SERVER);
  }

  store(): Record<string, unknown> {
    return this._store;
  }

  has(key: string): boolean {
    return Boolean(this.get(key));
  }

  private setEnvironment(): void {
    this._env = typeof window !== "undefined" ? ENV_CLIENT : ENV_SERVER;
  }

  private getServerVars(): Record<string, unknown> {
    if (this._env === ENV_SERVER) {
      try {
        return CONFIG().server || {};
      } catch {
        console.warn("Could not find a server.js config in `./config`.");
      }
    }
    return {};
  }

  private getClientVars(): Record<string, unknown> {
    try {
      return CONFIG().client || {};
    } catch {
      console.warn("Didn't find a client config in `./config`.");
    }
    return {};
  }

  private getUrgentOverrides(): Record<string, unknown> {
    const filename =
      isProcess() && ["production", "prod"].includes(process.env.NODE_ENV || "")
        ? "prod"
        : "dev";
    try {
      return CONFIG()[filename] || {};
    } catch {
      return {};
    }
  }

  private buildNestedKey(nestedKey: string): unknown {
    const keys = nestedKey.split(":");
    let storeKey: any = this._store;

    for (const k of keys) {
      if (storeKey[k] === undefined) {
        return undefined;
      }
      storeKey = storeKey[k];
    }

    return storeKey;
  }
}

export type ConfigStorage = typeof configStorage;
const configStorage = new Config();
export { configStorage };
export default configStorage as ConfigStorage;
