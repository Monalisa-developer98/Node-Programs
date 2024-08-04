let http = require('http');
let fs = require('fs')

let server = http.createServer((req, res)=>{
    fs.readFile('myText.txt', 'utf-8', (err, data)=>{
        if (err) throw err;
        res.write(data);
        res.end();
    })
})

server.listen(2345, ()=>{
    console.log('Server is running on port 2345');
})

// In http we can't define the routes so here we came to express. 
// The path that we have defined is called route.

// we can't achieve the routes using simple http. It is easy in express.

// EJS -----> It is a template engine which helps to display the content on screen.