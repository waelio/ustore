import { UStoreClassFunc } from "../types";
import { BehaviorSubject } from "rxjs";
type PossibleValues = string | number | object | boolean | null | undefined;
export declare const state: BehaviorSubject<Record<string, PossibleValues>>;
export declare const rxjsStorage: UStoreClassFunc;
export default rxjsStorage;
//# sourceMappingURL=rxjsStorage.d.ts.map