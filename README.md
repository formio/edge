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
const { Server } = require('@formio/appserver');
(async function bootup() {
    // Create the server.
    const server = await new Server();

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
To run this library locally, you can clone the repository, and then npm install.

```
yarn install
```

Then do the following.

```
cp .env.example .env
```

Now, within the ```.env``` file, modify all of the environment variables to be the correct values. Next, you can run the server using the following.

```
node index
```

### Custom Configuration
The AppServer is very extensible, and many things can be altered and modified as well as custom implementations of different components are possible using configurations.

The following configurations can be provided to the Server instance. Here are some configurations that are supported.

```js
const express = require('express');
const app = express();
const { Server, Prepper } = require('@formio/appserver');
const { CustomDB } = require('./customDb');
const { CustomAuth } = require('./customAuth');
const { CustomAction } = require('./actions/custom');
(async function bootup() {
    // Create the server.
    const server = await new Server({
        /**
         * The "db" configuration provides a way to use a Custom database implementation.
         * 
         * See https://github.com/formio/appserver/blob/main/src/db.ts for an example on 
         * how to implement your own custom db.
         */
        db: CustomDB,

        /**
         * The "auth" configuration provides a way to implement your own custom Authentication
         * system. 
         * 
         * See https://github.com/formio/appserver/blob/main/src/auth.ts for an example on 
         * how to implement one.
         */
        auth: CustomAuth,

        /**
         * The "actions" is a map of new Actions you wish to implement into the application
         * server. Each one that is provided will then become available within the Form
         * builder and can be configured as an action that is executed when the form is 
         * submitted.
         */
        actions: {
            custom: CustomAction
        },

        /**
         * Preppers provide you a way to hook into the data preparation methods that are
         * called before the submission is saved into the database, as well as when the data
         * is read from the database and sent up to the client. They provide a way to manipulate
         * the data before it is transfered. A good example of a prepper is to remove any 
         * "protected" fields so they are not sent up to the client application. 
         * 
         * See https://github.com/formio/appserver/tree/main/src/prepare for examples.
         * 
         * There are two types of preppers... those called on "save" and those called on "read".
         * 
         *  - save: Called when the submission is being saved.
         *  - read: Called when the submission is being read from the database and sent to the
         *          client application.
         * 
         * The "scope" argument is a PrepScope type. See https://github.com/formio/appserver/blob/main/src/types/submission.ts
         */
        preppers: {
            save: Prepper.preppers.save.concat([
                async (scope) => {
                    const { component, data, value, path } = scope;
                    // Do something with "data" property to mutate data prepped.
                    console.log('Save Prepper 1');
                }
            ]),
            read: Prepper.preppers.read.concat([
                async (scope) => {
                    const { component, data, value, path } = scope;
                    console.log('Read Prepper 1');
                }
            ])
        },

        /**
         * Processors provide a way to process data during the Create and Update phase for
         * submissions. They should return an "errors" array if there are any errors during the
         * processing phase. A good example of a processor is submission validation.
         * 
         * See https://github.com/formio/appserver/tree/main/src/process for other examples.
         * 
         * The "scope" argument is a ProcessScope type. See https://github.com/formio/appserver/blob/main/src/types/submission.ts
         */
        processors: Processor.processors.concat([
            async (scope) => {
                console.log('Custom Processor');
                return [];
            },
        ])
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
```

Enjoy

- The Form.io Team
