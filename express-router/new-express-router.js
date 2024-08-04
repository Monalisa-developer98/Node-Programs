let express = require('express');
let app = express();
let productRouter = express.Router();
let categoryRouter = express.Router();
let port = 4545;

var categoryData = [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    }
]

var products = [
    {
        "id": 1,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "Small",
        "Image": "https://i.ibb.co/fHj5Tgc/download.jpg",
        "Color": "Maroon",
        "Brand": "Gucci"
    },
    {
        "id": 2,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1500,
        "Size": "Medium",
        "Image": "https://i.ibb.co/tsXyK5Y/images.jpg",
        "Color": "Blue",
        "Brand": "Westside"
    },
    {
        "id": 3,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "Large",
        "Image": "https://i.ibb.co/NsVKKdd/images-1.jpg",
        "Color": "Pink",
        "Brand": "H&M"
    }    
]

app.get('/', (req, res)=>{
    res.send('Hii this is express router')
})

//default route
productRouter.route('/').get((req, res)=>{
    res.send(products);
})

productRouter.route('/details').get((req, res)=>{
    res.send('This is product details');
})

categoryRouter.route('/').get((req, res)=>{
    res.send(categoryData);
})

categoryRouter.route('/details').get((req, res)=>{
    res.send('This is category details');   
})

app.use('/products',productRouter);
app.use('/category',categoryRouter);

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})