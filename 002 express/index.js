const express = require('express');

const app = express();

app.get('/about/:name?', (req, res)=>{
    console.log(req.query, req.params);
    res.send('Hello World!')
});

app.post('/greet', (req, res)=>{
    res.send('hello')
})

app.listen(5000, ()=>{
    console.log('server is running on port 5000')
});