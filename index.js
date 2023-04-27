require('dotenv').config();
const express = require('express');
const app = express();
const { Server } = require('./lib');
(async function bootup() {
    // Create the server.
    const server = new Server();

    // Initialize the server.
    await server.init();

    // Add the server router.
    app.use(await server.router());

    // Start server.
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})();