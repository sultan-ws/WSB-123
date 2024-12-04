const express = require('express');
const token = 123456;

const app = express();

const m1 = (req, res, next)=>{
    if(!req.params.key) return res.status(400).send('please send a token');

    if(req.params.key != token) return res.status(401).send('please send a valid token');
    next();
}


const m2 = (req, res, next)=>{
    console.log('middleware 2');
    // res.send('m1 response')
    next();
}


const m3 = (req, res, next)=>{
    console.log('middleware 3');
    // res.send('m1 response')
    next();
}

app.get('/about/:key?', m1, (req, res)=>{
    res.status(200).send('hello');
})

app.get('/home/:key?', m1, (req, res)=>{
    res.send('hello hello' );
})

app.listen(4600, ()=>{
    console.log("Server is running on port 4600");
});