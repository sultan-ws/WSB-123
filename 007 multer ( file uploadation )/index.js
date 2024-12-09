const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// app.use(express.json());

const uploads =  multer({ storage : multer.diskStorage({
    destination: (req, file, cb)=>{
        cb( null, 'uploads');
    },
    filename: (req, file, cb)=>{
        cb( null,  Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
    }
})}).single('thumbnail');

app.post('/upload', uploads, async (req, res)=>{
    const data = req.body;

    if(req.file) data.thumbnail = req.file.filename;
    
    console.log(data);

    res.status(200).json({message:'success'});
});

app.listen(5200, ()=>{
    console.log('server is running on port 5200');
})