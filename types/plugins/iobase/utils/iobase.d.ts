export default class Iobase {
    dbName: string;
    lf: {};
    collectionName: any;
    orderByProperty: any;
    orderByDirection: any;
    limitBy: any;
    docSelectionCriteria: any;
    deleteCollectionQueue: {
        queue: any[];
        running: boolean;
    };
    config: {
        debug: boolean;
    };
    userErrors: any[];
    collection: any;
    doc: any;
    orderBy: any;
    limit: any;
    get: any;
    add: any;
    update: any;
    set: any;
    delete: any;
    constructor(dbName: string);
}
//# sourceMappingURL=iobase.d.ts.map