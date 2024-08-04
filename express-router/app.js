let express = require('express');
let app = express();
let router = express.Router();
let port = 4567;

router.get('/', (req, res)=>{
    res.write('Hii from express router')
    res.end();
})

app.use(router);

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})