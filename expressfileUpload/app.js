// // npm i ejs express body-parser express-fileupload

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const port = process.env.PORT || 7856;

// // static files
// app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'ejs');

// //middleware
// app.use(bodyParser.json({}));
// app.use(fileUpload());

// app.get('/', (req, res)=>{
//     res.render('index');
// })

// app.post('/upload', (req, res)=>{
//     // console.log(req.files);     // receive image
//     // console.log(req.body);    // receive image name
//     // res.send('ok');                // if we will not send response we will stuck in a loop

//     const imageFile = req.files.image;
//     imageFile.mv(`${__dirname}/public/images/${imageFile.name}`, (err,data)=>{
//         if (err) throw err;
//         res.render('display',{title:req.body.imgName,image:`${imageFile.name}`});
//     });

// })

// app.listen(port, (err)=>{
//     if (err) throw err;
//     console.log(`Server is running on port ${port}`);
// })



///////////////////// practice /////////////////////////////////

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 7645;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({}));
app.use(fileUpload());

app.get('/', (req, res)=>{
    res.render('index');
})

app.post('/upload', (req, res)=>{
    const imageFile = req.files.image;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`, (err, data)=>{
        if (err) throw err;
        res.render('display',{title:req.body.imgName, image:`${imageFile.name}`})
    });
})

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})
