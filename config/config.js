const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)})
module.exports = {
    "port" : process.env.PORT,
    "db_url" : process.env.DB_URL
}