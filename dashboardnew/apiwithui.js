const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const Mongo = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const cors = require('cors');
const bodyParser = require('body-parser');

async function main(){
    await client.connect();    // connection for the mongodb... get wait for the connection to mogodb
}


const collection = client.db('marchnode').collection('dashboard');
const port = process.env.PORT || 6822;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/health', (req,res)=>{
    res.send('Health Ok');
})

// addUser 
app.post('/addUser', async(req,res)=>{
    // give i/p from form
    let data = {
        name:req.body.name,
        city:req.body.city,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
        isActive:true
    }
    await collection.insertMany(data);
    // after inserting data automatically comes to the homepage
    res.redirect('/');
})

// default route to display all the users
app.get('/', async(req,res)=>{
    const output = [];
    const cursor = collection.find();
    for await(const doc of cursor){
        output.push(doc);
    }
    cursor.closed;
    res.render('index',{data:output});
})

// route to load the form
app.get('/new', async(req,res)=>{
    res.render('forms');
})

//get User
app.get('/users', async(req, res)=>{
    const output = [];    // define array
    let query = {};      // define query
    if (req.query.city && req.query.role){
        query = {city:req.query.city,role:req.query.role,isActive:true}
    }
    // http://localhost:6722/users?city=Paris&role=Admin (or) http://localhost:6722/users?role=Admin&city=Paris

    else if (req.query.city){
        query = {city:req.query.city,isActive:true}  // particular users w.r.t city
    }
    else if (req.query.role){
        query = {city:req.query.role,isActive:true}  // particular users w.r.t role
    }
    else if (req.query.isActive){
        let isActive = req.query.isActive;
        if (isActive == "false"){
            isActive = false
        }else{
            isActive = true;
        }
        query = {isActive};
    }
// http://localhost:6722/users?isActive=false

    const cursor = collection.find(query);  // get all the data
    for await(const doc of cursor){     // iterate over the array data and get insert into array
        output.push(doc);    // push all the get data into array
    }
    cursor.closed;
    res.send(output);
})


//get particular User
// let query = {_id:new Mongo.ObjectId(req.params.id)}
app.get('/user/:id', async(req,res)=>{
    const output = [];
    let query = {_id:new Mongo.ObjectId(req.params.id)}
    const cursor = collection.find(query);
    for await (const doc of cursor){
        output.push(doc);
    }
    cursor.closed;
    res.send(output);
})
// http://localhost:6722/users/64fc9d9e07b87f3c4e7c514b


// update users ---- use PUT method
app.put('/updateUser', async(req,res)=>{
    await collection.updateOne(
        {_id:new Mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true
            }
        }
    )
    res.send('Record Updated');
})

// delete Users
// /* Hard delete */  --- completely delete the user from db

app.delete('deleteUser', async(req,res)=>{
    await collection.deleteOne({_id:new Mongo.ObjectId(req.body._id)})
    res.send('User Deleted');
})

// delete Users/
/* Soft delete deactivate users */

app.put('/deactivateUser', async(req,res)=>{
    await collection.updateOne(
        {_id:new Mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        }
    )
    res.send('User Deactivated');
})

/* Soft delete activate users */
app.put('/activateUser', async(req,res)=>{
    await collection.updateOne(
        {_id:new Mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        }
    )
    res.send('User Activated');
})


app.listen(port, ()=>{
    main();
    console.log(`Server is ruunig on port ${port}`);
})


/////////////////////// Swagger ///////////////////////////////

// >>>>> we are checking through postman but now we are using a method called swagger