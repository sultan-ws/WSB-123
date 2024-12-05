const express = require('express');
const path = require('path');

const filepath = path.join(__dirname, 'public');

console.log(filepath);

const app = express();

app.use(express.static(filepath));

app.get('/', (req, res)=>{
    res.sendFile(filepath + '/home.html');
})

app.get('/about', (req, res)=>{
    res.sendFile(filepath + '/about.html');
})

app.listen(4600, ()=>{
    console.log("Server is running on port 4600");
})