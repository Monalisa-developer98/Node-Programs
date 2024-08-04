// npm i express axios redis@3.1.0

const express = require('express');
let app = express();
const axios = require('axios');
const redis = require('redis');
let port = process.env.PORT || 6754;
let client = redis.createClient({
    host:'localhost',
    port:9222
})

app.get('/data', (req,res)=>{
    let userInput = req.query.country.trim();
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    //check first in redis
    return client.get(userInput, (err, result)=>{
        if(result){
            const output = JSON.parse(result);
            res.send(output);
        }
        else{
            // if data is not part of redis fetch from api
            axios.get(url).then((res)=>{
                const output = res.data;
                client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis Cache',output}));
                res.send({source:'API Response',output})
            })
        }
    })
})

app.listen(port, (err)=>{
    if (err) throw err
    console.log(`Server is running on port ${port}`);
})




//////////////   practice  ////////////////////////////////////////////

// const express = require('express');
// let app = express();
// const redis = require('redis');
// const axios = require('axios');
// let port = process.env.PORT || 9021;
// let client = redis.createClient({
//     host:'localhost',
//     port:8970
// });

// app.get('/data',(req, res)=>{
//     let userInput = req.query.country.trim();
//     const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
//     // check in redis
//     return client.get(userInput, (err, result)=>{
//         if (result){
//             const output = JSON.parse(result);
//             res.send(output);
//         }
//         else{
//             // if data is not part of redis fetch from api
//             axios.get(url).then((res)=>{
//                 const output = res.data;
//                 client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis Cache',output}));
//                 res.send({source:'API Response',output})
//             })
//         }
//     })
// })

// app.listen(port, (err)=>{
//     if (err) throw err;
//     console.log(`Server is running on port ${port}`);
// })