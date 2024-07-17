require('dotenv').config();
const express = require('express');
const app = express();
const { Server } = require('./lib/server');
(async function bootup() {
    // Create the server.
    const server = new Server({
        hooks: {
            'submission:handlers': (scope, op, handlers) => {
                if (op === 'create' && scope.form.name === 'employee') {
                    handlers.unshift((req, res, next) => {
                        if (req.body.data.email === 'bad@example.com') {
                            return res.status(400).send('Bad email address');
                        }
                        next();
                    });
                }
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