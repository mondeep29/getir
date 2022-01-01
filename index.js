const express = require('express');
const router = express.Router()
const routes = require('./routes/router')(router);
const app = express()

app.use('/api/', routes);

module.exports = app;