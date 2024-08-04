// npm i express request


// node with babel with ES6 syntax i.e, {import} 

// we need to install some packages

// npm i @babel/core @babel/preset-env @babel/register

//  1. babel core
// 2. babel preset
// 3. babel register

// make file ------>>> .babelrc
// start.js   ------ one starting point required


import express from 'express';
import  request from 'request';
const app = express();
const port = process.env.PORT || 9056;

app.get('/weather',(req, res)=>{
    let city = req.query.city?req.query.city:'delhi';
    let url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    request(url, (err,apiResponse)=>{
        if (err) throw err;
        const output = JSON.parse(apiResponse.body);
        res.send(output);
        // res.render('index',{title:'Weather App',output});
    })
})

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`)
})


// after writing in start.js and .babelrc -----> // change the command in package.json  =----- node start.js
//   nodemon start.js
