import { UStoreClassFunc } from "../types";

type PossibleValues = string | number | object | boolean | null | undefined;

const state: Record<string, PossibleValues> = {};

export const signalStorage: UStoreClassFunc = {
  get: (key: string) => {
    if (!key) return null;
    return (state[key] as any) ?? null;
  },
  getItem: (key: string) => {
    if (!key) return null;
    return (state[key] as any) ?? null;
  },
  set: (key: string, value: PossibleValues) => {
    if (!key) return undefined;
    state[key] = value;
    return (value as any)?.[key];
  },
  setItem: (key: string, value: PossibleValues) => {
    if (!key) return undefined;
    state[key] = value;
    return (value as any)?.[key];
  },
  has: (key: string) => {
    if (!key) return false;
    return Object.prototype.hasOwnProperty.call(state, key);
  },
  hasItem: (key: string) => {
    if (!key) return false;
    return Object.prototype.hasOwnProperty.call(state, key);
  },
  remove: (key: string) => {
    if (!key) return false;
    const exists = Object.prototype.hasOwnProperty.call(state, key);
    if (exists) delete state[key];
    return !Object.prototype.hasOwnProperty.call(state, key);
  },
  removeItem: (key: string) => {
    if (!key) return false;
    const exists = Object.prototype.hasOwnProperty.call(state, key);
    if (exists) delete state[key];
    return !Object.prototype.hasOwnProperty.call(state, key);
  },
};

export default signalStorage;
