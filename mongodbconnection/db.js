// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("marchnode");
//   //Find all documents in the customers collection:
//   dbo.collection("category").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
// //    db.close();
//   });
// });

const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function getData()
{
    let result = await client.connect();
    let db = result.db('marchnode');
    let collection = db.collection('products');
    let response = await collection.find({}).toArray();
    console.log(response);
}

getData();