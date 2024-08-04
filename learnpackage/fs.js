// fs module---- write, read, append, rename, delete

let fs = require('fs');

// fs.writeFile('myText.txt','I am writing into the file',()=>{
//     console.log('Task Done')
// })

fs.readFile('myText.txt', 'utf-8', (err, data)=>{
    if (err) throw err;
    console.log(data);
})