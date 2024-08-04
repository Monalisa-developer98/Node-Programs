let express = require('express')
let productRouter = express.Router();

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

function router(menu){
    productRouter.route('/').get((req, res)=>{
        res.render('product',{title:'Product Page',products,menu});
    })
    
    productRouter.route('/details').get((req, res)=>{
        res.send('This is product details');
    })
    return productRouter;
}

module.exports = router;