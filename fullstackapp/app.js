// npm i ejs express dotenv mongodb

const express = require('express');
let app = express();
let dotenv = require('dotenv')
dotenv.config();
let port = process.env.PORT || 6698;


const menu = [
    {name: 'Home', link:'/'},
    {name: 'Category', link:'/category'},
    {name: 'Products', link:'/products'}
]

let catRouter = require('./src/controller/categoryRoutes')(menu);
let productRouter = require('./src/controller/productRoutes')(menu);

//static file path
app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index',{title: 'Home Page',menu});
})

app.use('/products',productRouter);
app.use('/category',catRouter);

app.listen(port, (err)=>{
    if (err) throw err
    console.log(`Server is running on port ${port}`);
})