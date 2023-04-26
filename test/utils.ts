import { ActionScope } from "../lib/types/action";
import { TestDatabase } from "./Database";
import { TestAuth } from "./Auth";

export function CreateActionScope(): ActionScope {
    return {
        config: {
            project: {
                url: '',
                key: ''
            },
            auth: {
                portal: '',
                secret: '',
                expire: 0
            },
            license: '',
            status: {}
        },
        db: new TestDatabase({
            url: '',
            name: '',
            config: {}
        }),
        auth: new TestAuth(),
        licenseKey: {
            terms: {
                serverless: []
            }
        },
        action: {},
        submission: {},
        form: {},
        project: {},
        handler: 'after',
        method: 'create',
        actions: {},
        hooks: {},
        template: {},
        utils: Utils
    };
}