const app = require('./index');
const http = require('http');
const server = http.createServer(app);
const port = require('./config/config').port ? require('./config/config').port : 3000
server.listen(port, (err)=>{
    if(err){
        console.log(`server creation failed with error : ${err}`);
    }
    else
    {
        console.log(`server running on port --> ${port}`);
    }
})