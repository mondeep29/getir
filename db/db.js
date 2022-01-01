
const {MongoClient} = require('mongodb');
const config = require('../config/config')
const url = config.db_url;
const client = new MongoClient(url);
module.exports = client;