import storeTwo from "store2";
import { UStoreClass } from "../.d";

const local = storeTwo.namespace("uStore");

export const localStorage: UStoreClass = {
  get: (key: string) => {
    try {
      return local.get(key);
    } catch (error) {
      console.error("Error in get method:", error);
      return null;
    }
  },
  getItem: (key: string) => {
    try {
      return local.get(key);
    } catch (error) {
      console.error("Error in getItem method:", error);
      return null;
    }
  },
  has: (key: string) => {
    try {
      return Boolean(local.get(key));
    } catch (error) {
      console.error("Error in has method:", error);
      return false;
    }
  },
  hasItem: (key: string) => {
    try {
      return Boolean(local.get(key));
    } catch (error) {
      console.error("Error in hasItem method:", error);
      return false;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      return local.set(key, value);
    } catch (error) {
      console.error("Error in set method:", error);
      return null;
    }
  },
  setItem: (key: string, value: unknown) => {
    try {
      return local.set(key, value);
    } catch (error) {
      console.error("Error in setItem method:", error);
      return null;
    }
  },
  remove: (key: string) => {
    try {
      return local.remove(key);
    } catch (error) {
      console.error("Error in remove method:", error);
      return null;
    }
  },
  removeItem: (key: string) => {
    try {
      return local.remove(key);
    } catch (error) {
      console.error("Error in removeItem method:", error);
      return null;
    }
  },
};

export default localStorage;
