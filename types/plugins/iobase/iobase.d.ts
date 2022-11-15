import { orderBy } from './api/filters/orderBy';
import { limit } from './api/filters/limit';
export default class Iobase {
    dbName: string;
    lf: {};
    collectionName: null;
    orderByProperty: null;
    orderByDirection: null;
    limitBy: null;
    docSelectionCriteria: null;
    deleteCollectionQueue: {
        queue: never[];
        running: boolean;
    };
    config: {
        debug: boolean;
    };
    userErrors: never[];
    collection: (collectionName: string) => any;
    doc: (docSelectionCriteria: any) => any;
    orderBy: typeof orderBy;
    limit: typeof limit;
    get: (options?: {
        keys: boolean;
    }) => any;
    add: (data: any, keyProvided: any) => Promise<unknown> | undefined;
    update: (docUpdates: any) => Promise<unknown>;
    set: (newDocument: any[], options?: {
        keys: boolean;
    }) => Promise<unknown>;
    delete: () => Promise<unknown>;
    constructor(dbName: string);
}
//# sourceMappingURL=iobase.d.ts.map