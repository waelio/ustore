import { ref, computed, Ref } from "vue";
export declare class UCORE {
    _STORE: Ref<any>;
    constructor(initial?: {});
    get(key?: string): any;
    getItem(key: string): any;
    setItem(k: string, val: string | number | object | any[] | boolean): any;
    removeItem(k: string): any;
    set value(v: string);
    get value(): string;
    has(key: string): boolean;
    _buildNestedKey(nestedKey: string): any;
}
export { ref, computed };
//# sourceMappingURL=index.d.ts.map