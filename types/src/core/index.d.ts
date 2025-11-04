import { ref, computed, Ref } from "vue";
export declare class UCORE {
    _STORE: Ref<any>;
    constructor(initial?: Record<string, any>);
    get(key?: string): any;
    getItem(key: string): any;
    setItem(k: string, val: any): any;
    removeItem(k: string): boolean;
    set value(v: any);
    get value(): any;
    has(key: string): boolean;
    private _buildNestedKey;
}
export { ref, computed };
//# sourceMappingURL=index.d.ts.map