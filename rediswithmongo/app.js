// npm i express mongodb@4.12.0 redis@3.1.0

const express = require('express');
const app = express();
const redis = require('redis');
const mongodb = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const port = process.env.PORT || 8967;
const client = redis.createClient({
    host: 'localhost',
    port: 1123
})

app.get('/data', (req, res)=>{
    const userInput = (req.query.color).trim();
    // first search in redis
    return client.get(userInput, (err,result)=>{
        if (result){
            const output = JSON.parse(result);
            res.send(output);
        }
        else{
            // if data is not present in redis fetch from mongodb
            mongodb.connect(mongoUrl, (err,dc)=>{
                let dbObj = dc.db('marchnode');
                dbObj.collection('products').find({'Color':userInput}).toArray((err,result)=>{
                    //first time save in redis
                    client.setex(userInput,3600,JSON.stringify({source:'Redis Cache',result}));
                    res.send({source:'MongoDB',result});
                })
            })
        }
    })
})

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})


// url -----> localhost://7600/data?color=Blue
// open network tab in developer console tab to see output.