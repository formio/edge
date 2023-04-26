import { FormScope } from "../lib/types/form";
import { DBConfig, ServerDB } from "../src/types/server";
export class TestDatabase implements ServerDB {
    constructor(public config: DBConfig) {}

    async connect() {}

    async save(collectionName: string, item: any) {
        return null;
    }

    async load(collectionName: string) {
        return null;
    }

    async index(scope: FormScope, query = {}) {
        return [];
    }

    async create(scope: FormScope, record: any, allowFields: string[] = []) {
    }


    async find(scope: FormScope, query: any = {}) {
        return [];
    }

    async findOne(scope: FormScope, query: any = {}) {
        return null;
    }

    async read(scope: FormScope, id: string) {
        return null;
    }

    async update(scope: FormScope, id: string, update: any, allowFields: string[] = []) {
        return null;
    }

    async delete(scope: FormScope, id: string) {
        return false;
    }
}