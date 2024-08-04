
* Page1 (Search)
-------------------------------
>> list of city ------------------  http://localhost:5601/location
>> restaurants wrt city   -------- http://localhost:5601/restaurants?stateId=3
>> list of meal type   ---------   http://localhost:5601/mealTypes

* Page2 (listing)
-------------------------------
>> retaurants wrt mealtypes    --------  http://localhost:5601/restaurant?meald=2&stateId=3
>> retaurants wrt mealtypes + cuisine  -----  http://localhost:5601/filter/1?cuisineId=2
>> retaurants wrt mealtypes + cost   ------ http://localhost:5601/filter/1?lcost=100&hcost=500


>>>>>>>>> sorting ------     http://localhost:5601/filter/1?cuisineId=2&sort=-1

>>>> pagination ----(skip and limit)---- http://localhost:5601/filter/1?cuisineId=2&sort=-1&skip=2&limit=2  

* Page3 (Details)
-------------------------------
>> details of the restaurant    ------ http://localhost:5601/details/64f33a72f3bc7a0b7950be97
>> menu wrt restaurant        --------- http://localhost:5601/menu/3

* Page4 (Order)
---------------------------------
>> menu details wrt to choice   ------- http://localhost:5601/menuItem  -- payload ---  {"id":[4,5,6]}
>> place order  ///test it using postman --- POST-body-raw-json ---- http://localhost:5601/placeOrder

--=={ "orderId": 3, "name": "Isha", "email": "isha@gmail.com", "address": "Hom 65", "phone": 8934645457, "cost": 255, "menuItem": [ 12,10 ]}

* Page5 (view Order)
----------------------------------
>> list all the orders          ----------- http://localhost:5601/orders
>> list all the orders wrt to email  ------- http://localhost:5601/orders?email=amit@gmail.com


>>> (update the order) update means put
--------------- ------------------- -------- http://localhost:3400/updateOrder
------------ payload ----- 
{
    "_id": "64fc66584435b937bf12b9c3",
    "status": "Order is on the way"
}

>>> delete the order
--------------- ------------------- -------- http://localhost:5601/deleteOrder
------------ payload ----- { "_id": "642a31aa6a5daa13032fa223" }





----------------------------------- mongodb queries --------------------------------------------
//find --->> db.collection.find()

// create database ----->> use databasename

// Insert ---> db.user.insert({"name":"Niki", "city":"ctc"})

// find with condition ---> db.collection.find({category_id:2})
                            db.products.find({category_id:2,Color:'Blue'}).pretty()

// projection --> db.restaurants.find({condition},{projection}).pretty()

=========== db.restaurants.find({state_id:1},{restaurant_name:1,cost:1}).pretty()
===== (if no-condition) ---->  db.restaurants.find({},{restaurant_name:1,cost:1}).pretty()

// nested condition
db.restaurants.find({"mealTypes.mealtype_id":1},{restaurant_name:1,"mealTypes.mealtype_id":1,_id:0}).pretty()     ----> _id:0 indicates we cannot see id.... if use nested condition then use " ".

---------------------------------------------------------------------------------------------------------------

db.retaurants.find({cost:{$lt:500}},{restaurant_name:1,cost:1,_id:0}).pretty()
db.retaurants.find({cost:{$gt:500,$lt:900}},{restaurant_name:1,cost:1,_id:0}).pretty()
---------------------------------------------------------------------------------------------------------------

db.restaurants.find({"mealTypes.mealtype_id":{$in:[1,6,7]}},{restaurant_name:1,"mealTypes.mealtype_id":1,_id:0}).pretty()

/////////////////////// UPDATE  ////////////////////////////////
-----------------------------------------
db.user.update({"name":"saloni"},{
    $set:{
        "city":"mumbai",
        "age":23
    }
})

------------ ///////////// unset   ----- remove the column ///////////////// ----------

db.user.update(
    {"name":"bhoomi"},
    {
    $unset:{
           "city":1
    }
})


======///////////// (delete all records) --///////////////////////////////

db.collection.remove({})

--------//////////// (delete particular record) -////////////---------------------

db.user.remove({_id:4})  (or)   db.user.deleteOne({_id:4}) 



------------------------------------ PRACTICE ------------------------------------

db.collection.find({"state_id":1})

db.collection.find({"state_id":1,"cost":450});

db.collection.find({"state_id":2},{"restaurant_name":1,"cost":1})

db.collection.find({"mealTypes.mealtype_id":1},{"average_rating":1,"address":1})

db.collection.find({"cost":{$lt:500}},{"restaurant_name":1,"cost":1,_id:0})

db.collection.find({"cost":{$gt:500,$lt:900}},{"restaurant_name":1,"cost":1,_id:0})

db.collection.find({"mealTypes.mealtype_id":{$in:[1,6,2]}},{"restaurant_name":1})