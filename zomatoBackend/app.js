// npm i express body-parser cors morgan dotenv mongodb@4.13.0

let express = require('express');
let app = express();
let mongo = require('mongodb');
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT || 8970;
let {dbConnect,getData,getDataSort,getDataSortLimit,
    postData,updateData,deleteData} = require('./controller/dbController');
let authKey = process.env.authKey;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


//heart beat
app.get('/',(req,res) => {
    res.send('Health Ok')
})

//list of city
app.get('/location', async(req,res)=>{
    // tokens are always passed through the header
    let key = req.header('x-basic-token');       // through header we basically pass the token
    // we cannot pass the token through browser we have to use postman for that. through postman we can pass the token.
    if(key == authKey){
        let query = {};
        let collection = 'locations';
        let output = await getData(collection,query);
        res.status(200).send(output);
    }
    else{
        res.status(201).send('Not a Authenticated Call');
    }
    
})
//  see authentication using postman...
//   Postman: Postman is an API(application programming interface) development tool which helps to build, test and modify APIs.
// 200 OK response code implies a successful request


// restaurants wrt city
app.get('/restaurants', async(req,res)=>{
    // common is state_id in locations and restaurantdata., so we will search in basis of state_id ---- it is compulsory, so params
    let query = {};
    let stateId = Number(req.query.stateId);
    let collection = 'restaurantdata';
    if (stateId){   // if stateId is passed my query will be:
        query = {state_id:stateId}
    }
    let output = await getData(collection,query);
    res.status(200).send(output);
})


// list of meal type
app.get('/mealTypes', async(req,res)=>{
    let query = {};
    let collection = 'Mealtypes';
    let output = await getData(collection,query);
    res.status(200).send(output);
})

// req --> what we send to server(params,queryParams,body)
// res --> what server send us back

// retaurants wrt mealtypes
// ((((mealtype_id is common in restaurantdata and mealtypes, so search in basis of mealtype_id))))
app.get('/restaurant', async(req, res)=>{
    let query = {};
    let collection = 'restaurantdata';
    let mealId = Number(req.query.mealId);
    let stateId = Number(req.query.stateId);
    if (mealId && stateId){        // this shoul be first if more than one conditions
        query ={state_id:stateId,"mealTypes.mealtype_id":mealId};
    }
    else if (mealId){
            query = {"mealTypes.mealtype_id":mealId}  // if it is nested put " "
    }
    else if (stateId){   // if stateId is passed my query will be:
        query = {state_id:stateId}
    }
    let output = await getData(collection,query);
    res.status(200).send(output);
})

// filters   --- mealtype + cuisine
// mealtype is anyways compulsory, on basis of mealtype we will find cuisine.
app.get('/filter/:mealId', async(req,res)=>{
    let query = {};
    let sort = {cost:1}   // default ascending order , -1 is descending order
    let collection = 'restaurantdata';
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    // retaurants wrt mealtypes + cost
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let skip = 0;
    let limit = 1000000000000

    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit);
    }
    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if (lcost && hcost){
        query ={"mealTypes.mealtype_id":mealId, $and:[{cost:{$gt:lcost,$lt:hcost}}]};
    }
    else if (cuisineId){
        query ={"mealTypes.mealtype_id":mealId, "cuisines.cuisine_id":cuisineId};
    }
    // let output = await getData(collection,query);
    // let output = await getDataSort(collection,query,sort);
    let output = await getDataSortLimit(collection,query,sort,skip,limit)
    res.status(200).send(output);
})

// details of the restaurant 
app.get('/details/:id', async(req, res)=>{
    // using normal id
            // let _id = Number(req.params.id);   
            // let query = {restaurant_id:_id}
// using object ID
    let _id = mongo.ObjectId(req.params.id);
    let query = {_id:_id};
    let collection = 'restaurantdata';
    let output = await getData(collection,query);
    res.status(200).send(output);
})

// menu wrt restaurant
app.get('/menu/:id', async(req, res)=>{
    let id = Number(req.params.id);   
    let query = {restaurant_id:id}
    let collection = 'restaurantdata';
    let output = await getData(collection,query);
    res.status(200).send(output);
})

// * Page4 (Order) -- post api
// place order

app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    console.log(req.body)
    let collection = 'rorders';
    let response = await postData(collection,data);
    res.send(response)
})  // test the request in postman..  use postman for post api...... browser doesn't have body data.

// menu details wrt to id {"id":[1,2,3]}
app.post('/menuItem', async(req,res)=>{
    if(req.body.id){
        if (Array.isArray(req.body.id)){
            console.log(req.body.id); 
            let query = {menu_id:{$in:req.body.id}};
            let collection = 'menu';
            let output = await getData(collection,query);
            res.status(200).send(output);
        }else{
            res.send('Array required as input');
        }

    }else{
        res.send('Id is required with array');
    }
}) /// go to post in postman


// list all the orders
// (email is optional so query params)
app.get('/orders', async(req, res)=>{
    let query = {};
    let email = req.query.email;
    let collection = 'rorders';
    if (email){
        query = {email:req.query.email};
    }
    let output = await getData(collection,query);
    res.status(200).send(output);
})


// update Orders --- update means put
app.put('/updateOrder', async(req, res)=>{
    let collection = 'rorders';
    let condition = {_id:mongo.ObjectId(req.body._id)};
    let data = {
        $set: {
            "status": req.body.status
        }
    }
    let output = await updateData(collection,condition,data);
    res.status(200).send(output);
})  /// go to put in postman
//{"_id":"64fc66584435b937bf12b9c3","orderId":2,"name":"Amit","email":"amit@gmail.com","address":"Hom 65","phone":6534645457,"cost":305,"menuItem":[12,10],"status":"Order is on the way"}]


// delete the orders
app.delete('/deleteOrder', async(req, res)=>{
    let collection = 'rorders';
    let condition = {_id:mongo.ObjectId(req.body._id)};
    let rowCount = await getData(collection,condition);
    if (rowCount.length != 0){
        let response = await deleteData(collection,condition);
        res.send('Data Deleted')
    }else{
        res.send('No Data Found');
    }
})


app.listen(port,() => {
    dbConnect();
    console.log(`Running on port ${port}`)
})