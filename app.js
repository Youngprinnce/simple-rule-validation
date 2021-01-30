const express = require('express');
const compression = require('compression');
const routes = require('./routes/routes');
const config = require("./config/config")

//Instantiate app
const app = express();

//Express Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// gzip compression
app.use(compression());

//Routes
routes(app);

//TCP port
const port = config.serverPort || 5000;

// Start a TCP server listening for connections on the given port and host
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}/`);
});    

module.exports = app;
