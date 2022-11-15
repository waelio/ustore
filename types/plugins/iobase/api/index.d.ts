import { actions } from "./actions";
import { filters } from "./filters";
import { selectors } from "./selectors";
export declare const api: {
    actions: {
        add: typeof import("./actions").add;
        delete: typeof import("./actions").Ddelete;
        get: typeof import("./actions").get;
        set: typeof import("./actions").set;
        update: typeof import("./actions").update;
    };
    filters: {
        limit: typeof import("./filters").limit;
        orderBy: typeof import("./filters").orderBy;
    };
    selectors: {
        collections: typeof import("./selectors").collections;
        doc: typeof import("./selectors").doc;
    };
};
export default api;
export { actions };
export { filters };
export { selectors };
//# sourceMappingURL=index.d.ts.map