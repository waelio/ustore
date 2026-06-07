import Keyv from "keyv";
import KeyvMongo from "@keyv/mongo";

export type ServerStoragePrimitive = string | number | boolean | null;
export type ServerStorageValue =
  | ServerStoragePrimitive
  | { [key: string]: ServerStorageValue }
  | ServerStorageValue[];

export type ServerStorageSetOptions = {
  ttl?: number;
};

export type ServerStorageOptions = {
  keyv?: Keyv<ServerStorageValue>;
  store?: unknown;
  namespace?: string;
  ttl?: number;
};

export interface UStoreServerClass {
  type: "serverStorage";
  keyv: Keyv<ServerStorageValue>;
  get(key: string): Promise<ServerStorageValue | undefined>;
  getItem(key: string): Promise<ServerStorageValue | undefined>;
  set(
    key: string,
    value: ServerStorageValue,
    options?: ServerStorageSetOptions
  ): Promise<Record<string, ServerStorageValue>>;
  setItem(
    key: string,
    value: ServerStorageValue,
    options?: ServerStorageSetOptions
  ): Promise<Record<string, ServerStorageValue>>;
  remove(key: string): Promise<boolean>;
  removeItem(key: string): Promise<boolean>;
  has(key: string): Promise<boolean>;
  hasItem(key: string): Promise<boolean>;
  clear(): Promise<void>;
}

const createKeyvInstance = (
  options: ServerStorageOptions = {}
): Keyv<ServerStorageValue> => {
  if (options.keyv) {
    return options.keyv;
  }

  return new Keyv<ServerStorageValue>({
    store: options.store ?? new Map<string, ServerStorageValue>(),
    namespace: options.namespace,
    ttl: options.ttl,
  });
};

export const createServerStorage = (
  options: ServerStorageOptions = {}
): UStoreServerClass => {
  const keyv = createKeyvInstance(options);
  const fallbackTTL = options.ttl;

  const getValue = async (
    key: string
  ): Promise<ServerStorageValue | undefined> => {
    const value = await keyv.get(key);
    return value === undefined ? undefined : value;
  };

  const setValue = async (
    key: string,
    value: ServerStorageValue,
    setOptions?: ServerStorageSetOptions
  ): Promise<Record<string, ServerStorageValue>> => {
    await keyv.set(key, value, setOptions?.ttl ?? fallbackTTL);
    return { [key]: value };
  };

  return {
    type: "serverStorage",
    keyv,
    get: async (key: string) => getValue(key),
    getItem: async (key: string) => getValue(key),
    set: async (
      key: string,
      value: ServerStorageValue,
      setOptions?: ServerStorageSetOptions
    ) => setValue(key, value, setOptions),
    setItem: async (
      key: string,
      value: ServerStorageValue,
      setOptions?: ServerStorageSetOptions
    ) => setValue(key, value, setOptions),
    remove: async (key: string) => keyv.delete(key),
    removeItem: async (key: string) => keyv.delete(key),
    has: async (key: string) => (await keyv.get(key)) !== undefined,
    hasItem: async (key: string) => (await keyv.get(key)) !== undefined,
    clear: async () => {
      await keyv.clear();
    },
  };
};

export const createMongoServerStorage = (
  connectionUri: string,
  options: Omit<ServerStorageOptions, "keyv" | "store"> = {}
): UStoreServerClass => {
  return createServerStorage({
    ...options,
    store: new KeyvMongo(connectionUri),
  });
};

export const serverStorage = createServerStorage({ namespace: "ustore" });

export default serverStorage;
