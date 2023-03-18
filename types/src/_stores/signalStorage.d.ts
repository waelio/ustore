import { UStoreClassFunc } from "../types";
type possibleValues = string | number | object | Boolean | Function | null;
export declare function getSignal(T: possibleValues): {
    payload: import("solid-js").Accessor<possibleValues>;
    setPayload: import("solid-js").Setter<possibleValues>;
};
export declare const signalStorage: UStoreClassFunc;
export default signalStorage;
//# sourceMappingURL=signalStorage.d.ts.map