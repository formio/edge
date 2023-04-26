## Form.io Application Server
The Form.io Application Server is a performant run-time application server used to serve single project templates (including forms, resources, roles, etc) at a single deployed endpoint. It's goal is to enable rapid single tenant deployments where you wish to manage all Forms and Resources within a single location, but store the tenant data within their own database.

### Installation
To use this library, you must mount it within an Express.js application. As an example, you can create a simple Express.js application with this library by first creating a new [Express.js application](https://expressjs.com/en/starter/installing.html) and then install and use the Server as follows.

```
npm install --save @formio/appserver
```

Then within your server.js file, you would add the following.

```js
const express = require('express');
const app = express();
const { Server, Modules } = require('@formio/appserver');

// Declare our new server instance.
const server = new Server({
    db: new Modules.db({
        url: "mongodb://localhost:27017/subserver",
        config: {}
    }),
    auth: new Modules.auth(),
    actions: Modules.actions,
    process: Modules.process,
    prepare: Modules.prepare,
    config: {
        license: licenseKey,
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

// Bootup the server.
(async function bootup() {
    // Initialize the server.
    await server.init();

    // Add the server router.
    app.use(await server.router());

    // Start server.
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})();
```

### Running Locally
To run this library locally, you can clone the repository, and then do the following.

```
cp .env.example .env
```

Now, within the ```.env``` file, modify all of the environment variables to be the correct values. Next, you can run the server using the following.

```
node index
```

### Configuration
The following configurations can be provided to the Server instance.
