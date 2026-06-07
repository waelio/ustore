import { UStoreClassFunc } from "../types";
import { BehaviorSubject } from "rxjs";

type PossibleValues = string | number | object | boolean | null | undefined;

export const state = new BehaviorSubject<Record<string, PossibleValues>>({});

export const rxjsStorage: UStoreClassFunc = {
  get: (key: string) => {
    if (!key) return null;
    return (state.getValue()[key] as any) ?? null;
  },
  getItem: (key: string) => {
    if (!key) return null;
    return (state.getValue()[key] as any) ?? null;
  },
  set: (key: string, value: PossibleValues) => {
    if (!key) return undefined;
    const currentState = state.getValue();
    state.next({ ...currentState, [key]: value });
    return (value as any)?.[key] ?? value;
  },
  setItem: (key: string, value: PossibleValues) => {
    if (!key) return undefined;
    const currentState = state.getValue();
    state.next({ ...currentState, [key]: value });
    return (value as any)?.[key] ?? value;
  },
  has: (key: string) => {
    if (!key) return false;
    return Object.prototype.hasOwnProperty.call(state.getValue(), key);
  },
  hasItem: (key: string) => {
    if (!key) return false;
    return Object.prototype.hasOwnProperty.call(state.getValue(), key);
  },
  remove: (key: string) => {
    if (!key) return false;
    const currentState = state.getValue();
    const exists = Object.prototype.hasOwnProperty.call(currentState, key);
    if (exists) {
      const newState = { ...currentState };
      delete newState[key];
      state.next(newState);
    }
    return !Object.prototype.hasOwnProperty.call(state.getValue(), key);
  },
  removeItem: (key: string) => {
    if (!key) return false;
    const currentState = state.getValue();
    const exists = Object.prototype.hasOwnProperty.call(currentState, key);
    if (exists) {
      const newState = { ...currentState };
      delete newState[key];
      state.next(newState);
    }
    return !Object.prototype.hasOwnProperty.call(state.getValue(), key);
  },
};

export default rxjsStorage;
