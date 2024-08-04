let express = require('express');
let app = express();
let port = 7878;

// default route
app.get('/', (req, res)=>{
    res.send('Hii fron Node Server');
})

//category Route
app.get('/category',(req, res)=>{
    res.send('This is category Route');
})

// product route
app.get('/products', (req, res)=>{
    res.send('This is product route');
})

//details route
app.get('/details', (req, res)=>{
    res.send('Ths is details route');
})

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})