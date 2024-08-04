// Weather app---( we will call 3rd party api)-- npm i ejs express request

//      -->> request --- is responsible for calling the api


const express = require('express');
let app = express();
const request = require('request');
let port = process.env.PORT || 9706;

app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/weather', (req, res)=>{
    let city = req.query.city?req.query.city:'Delhi'
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    request(url, (err,apiResponse)=>{
        if(err) throw err;
        const output = JSON.parse(apiResponse.body);
        res.render('index',{title:'Weather App',result:output})

    })
})

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})


// output url ----->    http://localhost:9706/weather?city=mumbai


// >>>>>> request takes 2 parameters i.e, (url,callback)


// A common use of JSON is to exchange data to/from a web server.
// When receiving data from a web server, the data is always a string.
// Parse the data with JSON.parse(), and the data becomes a JavaScript object.


// ---- (try in this way) ------------

// npm install axios

// const axios = require('axios');

// const url = 'http://example.com';

// axios.get(url)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });

// -=========== (program using .then)==============================


// const axios = require('axios');
// const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=mumbai&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29';

// axios.get(url).then((res)=>{
//     console.log(res.data);
// })
// .catch((err)=>{
//     console.error('Error:', err.message);
// })


// When including npm packages in your Node.js application, it's common to use ''''const'''' to declare the variable that will hold the reference to the imported package. This practice has several benefits and aligns with best practices in JavaScript development:


