const http = require('http');

http.createServer((req, res)=>{
    console.log(req.url);
    if(req.method === 'POST'){
        res.end('<h1>hello</h1>');
    }
   
}).listen(4200);