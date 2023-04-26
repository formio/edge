import { Auth } from "./auth";
import { Database } from "./db";
import Actions from "./actions";
import { Processor } from "./process";
import { Prepper } from './prepare';
export const Modules = {
    db: Database,
    auth: Auth,
    process: Processor,
    prepare: Prepper,
    actions: Actions
};