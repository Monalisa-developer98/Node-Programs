const express = require('express');
let catRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const url = process.env.MongoUrl;

function router(menu){

    catRouter.route('/').get((req, res)=>{
        mongodb.connect(url, (err,dc)=>{
            if (err) {
                res.status(500).send('Error while connecting');
            }
            else{
                dbObj = dc.db('marchnode');
                dbObj.collection('category').find().toArray((err,data)=>{
                    if(err){
                        res.status(500).send('Error while fetching');
                    }else{
                        res.render('category',{title:'Category Page',catData:data,menu})
                    }
                })
            }
        })
        
    })
        
    // details route of category
    catRouter.route('/details')
        .get((req,res) => {
            res.send('Category Details')
        })
    
    return catRouter

}

module.exports = router;