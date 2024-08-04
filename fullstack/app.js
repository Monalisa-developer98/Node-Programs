// npm i ejs express dotenv

let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 4547;

const menu = [
    {name:'Home', link:'/'},
    {name:'Category', link:'/category'},
    {name:'Products', link:'/products'}
]    

let productRouter = require('./src/controller/productRoutes')(menu);
let categoryRouter = require('./src/controller/categoryRoute')(menu);

app.use(express.static(__dirname + '/public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index',{title:'Home page', menu})
})

app.use('/products',productRouter);
app.use('/category',categoryRouter);

//let add = (a,b) => { return a+b }
app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})