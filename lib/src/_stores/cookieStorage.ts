import { UStoreClass } from "../.d";
const isReady = typeof window !== "undefined";
export let memoryStore: Record<string, any> = {};

export const cookieStorage: UStoreClass = {
  get: (key: string) => {
    try {
      if (!isReady) {
        return memoryStore[key] ?? false;
      }
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const cookie = cookies.find((item) => item.startsWith(`${key}=`));
      return cookie ? cookie : false;
    } catch (error) {
      console.error("Error in get method:", error);
      return false;
    }
  },
  getItem: (key: string) => {
    try {
      if (!isReady) {
        return memoryStore[key] ?? false;
      }
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const cookie = cookies.find((item) => item.startsWith(`${key}=`));
      return cookie ? cookie : false;
    } catch (error) {
      console.error("Error in getItem method:", error);
      return false;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      if (!isReady) {
        memoryStore[key] = `${key}=${value}`;
        return;
      }
      document.cookie = `${key}=${value}; path=/;`;
    } catch (error) {
      console.error("Error in set method:", error);
    }
  },
  setItem: (key: string, value: unknown) => {
    try {
      if (!isReady) {
        memoryStore[key] = `${key}=${value}`;
        return;
      }
      document.cookie = `${key}=${value}; path=/;`;
    } catch (error) {
      console.error("Error in setItem method:", error);
    }
  },
  remove: (key: string) => {
    try {
      if (!isReady) {
        delete memoryStore[key];
        return;
      }
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.error("Error in remove method:", error);
    }
  },
  removeItem: (key: string) => {
    try {
      if (!isReady) {
        delete memoryStore[key];
        return;
      }
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.error("Error in removeItem method:", error);
    }
  },
  has: (key: string): boolean => {
    try {
      if (!isReady) {
        return key in memoryStore;
      }
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      return cookies.some((item) => item.startsWith(`${key}=`));
    } catch (error) {
      console.error("Error in has method:", error);
      return false;
    }
  },
  hasItem: (key: string): boolean => {
    try {
      if (!isReady) {
        return key in memoryStore;
      }
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      return cookies.some((item) => item.startsWith(`${key}=`));
    } catch (error) {
      console.error("Error in hasItem method:", error);
      return false;
    }
  },
};

export default cookieStorage;
