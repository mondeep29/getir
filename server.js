const app = require('./index');
const http = require('http');
const server = http.createServer(app);
const path = require('path');
require('dotenv').config({path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});
const port = process.env.PORT || 3000
server.listen(port, (err)=>{
    if(err){
        console.log(`server creation failed with error : ${err}`);
    }
    else
    {
        console.log(`server running on port --> ${port}`);
    }
})