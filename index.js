require('dotenv').config();
const express = require('express');
const app = express();
const get = require('lodash/get');
const { Server, Modules } = require('./server');
const packageJson = require('./package.json');
(async function bootup() {
    const server = new Server({
        db: new Modules.db({
            url: get(process.env, 'MONGO', "mongodb://localhost:27017/appserver"),
            config: get(process.env, 'MONGO_CONFIG', "{}")
        }),
        auth: new Modules.auth(),
        actions: Modules.actions,
        process: Modules.process,
        prepare: Modules.prepare,
        config: {
            license: get(process.env, 'LICENSE_KEY', ''),
            status: {
                name: packageJson.name,
                nameVersion: packageJson.version,
                version: '8.0.0'
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
        }
    });

    // Initialize the server.
    await server.init();

    // Add the server router.
    app.use(await server.router());

    // Start server.
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})();