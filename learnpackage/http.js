let http = require('http');

let server = http.createServer((req, res)=>{
    res.write('<h1>Hii from Node Server</h1>');
    res.end();
})

server.listen(1234, ()=>{
    console.log('Server is running on 1234');
})