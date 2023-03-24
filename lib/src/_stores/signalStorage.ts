import { createSignal } from "solid-js";
import { isObject } from "waelio-utils";
import { UStoreClassFunc } from "../types";
type possibleValues = string | number | object | Boolean | Function | null;

export function getSignal(T: possibleValues) {
  if (T && isObject(T)) {
    const [payload, setPayload] = createSignal(T, { equals: false });
    return {
      payload: payload,
      setPayload: setPayload,
    };
  }
  const [payload, setPayload] = createSignal(T, { equals: false });
  return {
    payload: payload,
    setPayload: setPayload,
  };
}

export const signalStorage: UStoreClassFunc = {
  get: (key: string): string | null => {
    if (!key) return "Please set a key";
    try {
      const { payload } = getSignal(key);
      return payload() as any;
    } catch (error) {
      console.log(error);
      return error as string;
    }
  },
  getItem: (key: string): string => {
    if (!key) return "Please set a key";
    try {
      const { payload } = getSignal(key);
      return payload() as string;
    } catch (error) {
      console.log(error);
      return error as string;
    }
  },
  set: (key: string, value: possibleValues) => {
    if (!key) return "Please set a key";
    const { payload, setPayload } = getSignal({ [key]: value });
    try {
      setPayload((current) => {
        if (current && isObject(current)) {
          current[key] = value;
          return current;
        }
        current = value;
        return payload;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  setItem: (key: string, value: possibleValues) => {
    if (!key) return "Please set a key";
    const { payload, setPayload } = getSignal({ [key]: value });
    try {
      setPayload((current) => {
        if (current && isObject(current)) {
          current[key] = value;
          return current;
        }
        current = value;
        return payload;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  has: (key: string): boolean => {
    const { payload } = getSignal(key);
    try {
      return !!payload();
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  hasItem: (key: string): boolean => {
    const { payload } = getSignal(key);
    try {
      return !!payload();
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  remove: (key: string) => {
    const { setPayload } = getSignal(key);
    try {
      return setPayload((current) => {
        if (current && isObject(current)) {
          current[key] = null;
          return current;
        }
        current = null;
        return current;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeItem: (key: string) => {
    const { setPayload } = getSignal(key);
    try {
      return setPayload((current) => {
        if (current && isObject(current)) {
          current[key] = null;
          return current;
        }
        current = null;
        return current;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default signalStorage;
