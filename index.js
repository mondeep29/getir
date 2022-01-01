const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const router = express.Router()
const routes = require('./routes/router')(router);
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use('/api/', routes);

module.exports = app;