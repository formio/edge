import { Collection, Db } from 'mongodb';
import { DBConfig, ServerDB, FormScope } from '@formio/appserver-types';
export declare class Database implements ServerDB {
    config: DBConfig;
    db: Db | null;
    currentCollectionName: string;
    currentCollection: Collection<Document> | null;
    defaultCollection: Collection<Document> | null;
    prefix: string;
    constructor(config: DBConfig);
    ObjectId(id: any): any;
    collectionName(name: string): string;
    /**
     * Connect to the database.
     * @param {*} scope
     * @returns
     */
    connect(prefix?: string): Promise<void>;
    save(collectionName: string, item: any): Promise<import("mongodb").WithId<import("bson").Document> | null>;
    load(collectionName: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
    remove(collectionName: string): Promise<number | null>;
    /**
     * Ensures the form collection is created an returns it.
     * @param scope
     * @returns
     */
    formCollection(scope: FormScope): Promise<Collection<Document> | null>;
    /**
     * Setup indexes.
     */
    setupIndexes(collection: Collection<Document> | null, scope?: FormScope): Promise<void>;
    /**
     * Add a field index
     */
    addIndex(collection: Collection<Document>, path: string): Promise<void>;
    /**
     * Adds new indexes to the forms submission collection.
     * @param scope
     * @param indexes
     * @returns
     */
    addIndexes(scope: FormScope, indexes: string[]): Promise<void>;
    /**
     * Remove a field index.
     */
    removeIndex(collection: Collection<Document>, path: string): Promise<void>;
    /**
     * Removes indexes to the forms submission collection.
     * @param scope
     * @param indexes
     * @returns
     */
    removeIndexes(scope: FormScope, indexes: string[]): Promise<void>;
    /**
     * Fetch a list of submissions from a table/collection.
     * @param {*} table
     * @param {*} query
     */
    index(scope: FormScope, query?: any): Promise<import("mongodb").WithId<Document>[] | undefined>;
    /**
     * Create a new record.
     */
    create(scope: FormScope, record: any, allowFields?: string[]): Promise<import("mongodb").WithId<Document> | null | undefined>;
    /**
     * Return a query for a single mongo record.
     * @param {*} form
     * @param {*} id
     * @returns
     */
    query(scope: FormScope, query?: any): any;
    /**
     * Find many records that match a query.
     */
    find(scope: FormScope, query?: any, limit?: number, skip?: number, sort?: any): Promise<import("mongodb").WithId<Document>[]>;
    /**
     * Find a record for a provided query.
     */
    findOne(scope: FormScope, query?: any): Promise<import("mongodb").WithId<Document> | null>;
    /**
     * Read a single submission from a form
     *
     * @param {*} table
     * @param {*} query
     */
    read(scope: FormScope, id: string): Promise<import("mongodb").WithId<Document> | null>;
    /**
     * Update a single submission of a form.
     *
     * @param {*} table
     * @param {*} query
     */
    update(scope: FormScope, id: string, update: any, allowFields?: string[]): Promise<import("mongodb").WithId<Document> | null>;
    /**
     * Delete a record from the database.
     */
    delete(scope: FormScope, id: string): Promise<boolean>;
}
