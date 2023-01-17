import { IUStoreClassInterface } from "../.d";
const isReady = Boolean(typeof window !== "undefined");
export let memoryStore = {};
export const cookieStorage: IUStoreClassInterface = {
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
  // @ts-ignore
  has: (key: string) => {
    try {
      return !isReady
        ? Boolean(memoryStore[key])
        : Boolean(
            window.document.cookie
              .split(";")
              .find((item: string) => item.split("=")[0] === key)
          );
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
  remove: (key: string) => {
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
