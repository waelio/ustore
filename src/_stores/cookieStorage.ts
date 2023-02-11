import { UStoreClass } from "../.d";
const isReady = Boolean(typeof window !== "undefined");
export let memoryStore = {};
export const cookieStorage: UStoreClass = {
  get: (key: string) => {
    try {
      return !isReady
        ? memoryStore[key]
        : window.document.cookie
            .split(";")
            .find((item: string) => item.split("=")[0] === key);
    } catch (error: unknown) {
      return error || null;
    }
  },
  getItem: (key: string) => {
    try {
      return !isReady
        ? memoryStore[key]
        : window.document.cookie
            .split(";")
            .find((item: string) => item.split("=")[0] === key);
    } catch (error: unknown) {
      return error || null;
    }
  },
  has: (key: string) => {
    try {
      return !isReady
        ? memoryStore[key]
        : (window.document.cookie
            .split(";")
            .find(
              (item: string) => item.split("=")[0] === key
            ) as unknown as boolean);
    } catch (error: unknown) {
      return error || null;
    }
  },
  hasItem: (key: string) => {
    try {
      return !isReady
        ? memoryStore[key]
        : (window.document.cookie
            .split(";")
            .find(
              (item: string) => item.split("=")[0] === key
            ) as unknown as boolean);
    } catch (error: unknown) {
      return error || null;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      const payload = {};
      payload[key] = value;
      return !isReady
        ? (memoryStore = payload)
        : (window.document.cookie = `${key}=${value}`);
    } catch (error: unknown) {
      return error || null;
    }
  },
  setItem: (key: string, value: unknown) => {
    try {
      const payload = {};
      payload[key] = value;
      return !isReady
        ? (memoryStore = payload)
        : (window.document.cookie = `${key}=${value}`);
    } catch (error: unknown) {
      return error || null;
    }
  },
  remove: (key: string) => {
    try {
      return !isReady
        ? (memoryStore = { ...{ key: null } })
        : (window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
    } catch (error: unknown) {
      return error || null;
    }
  },
  removeItem: (key: string) => {
    try {
      return !isReady
        ? (memoryStore = { ...{ key: null } })
        : (window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
    } catch (error: unknown) {
      return error || null;
    }
  },
};
export default cookieStorage;
