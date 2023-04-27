import { Server as CoreServer } from '@formio/appserver-core';
import { Auth } from "./auth";
import { Database } from "./db";
import Actions from "./actions";
import { Processor } from "./process";
import { Prepper } from './prepare';
import { AppServerScope, Processor as ProcessorType, Prepper as PrepperType, ServerConfig } from '@formio/appserver-types';
import { cwd } from 'process';
import path from 'path';
import fs from 'fs';
import get from 'lodash/get';
import defaultsDeep from 'lodash/defaultsDeep';
const packageJson = require('../package.json');
const appCorePackage = require('@formio/appserver-core/package.json');
const corePackage = require('@formio/core');

// Load the license key.
let licenseKey = get(process.env, 'LICENSE_KEY', '');
if (!licenseKey) {
    try {
        licenseKey = fs.readFileSync(path.join(cwd(), 'license.txt'), 'utf8');
    }
    catch (err) {
        console.error('No license key found. Please set the LICENSE_KEY environment variable or create a license.txt file in the root of the project.');
    }
}

export const Modules = {
    db: Database,
    auth: Auth,
    processor: Processor,
    prepper: Prepper,
    actions: Actions
};

export class Server extends CoreServer {
    constructor(config: AppServerScope = {}) {
        if (config.processors) {
            Modules.processor.processors = config.processors;
        }
        if (config.preppers) {
            Modules.prepper.preppers = config.preppers;
        }
        if (!config.actions) {
            config.actions = {};
        }
        super({
            db: config.db || new Modules.db({
                url: get(process.env, 'MONGO', "mongodb://localhost:27017/subserver"),
                config: get(process.env, 'MONGO_CONFIG', "{}")
            }),
            processor: Modules.processor,
            prepper: Modules.prepper,
            auth: config.auth || new Modules.auth(),
            actions: {...Modules.actions, ...config.actions},
            config: defaultsDeep(config.config || {}, {
                license: licenseKey,
                cache: (get(process.env, 'PROJECT_CACHE', true)).toString() === 'true',
                status: {
                    '@formio/appserver': packageJson.version,
                    '@formio/appserver-core': appCorePackage.version,
                    '@formio/core': corePackage.version
                },
                auth: {
                    portal: get(process.env, 'PORTAL_SECRET', ''),
                    secret: get(process.env, 'JWT_SECRET', ''),
                    expire: get(process.env, 'JWT_EXPIRE_TIME', 240)
                },
                project: {
                    url: get(process.env, 'PROJECT_ENDPOINT', ''),
                    key: get(process.env, 'PROJECT_KEY', '')
                }
            })
        });
    }
}

export { Prepper };
export { Processor };
export { Database };
export { Auth };
export { Actions };