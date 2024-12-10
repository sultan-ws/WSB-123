const express = require('express');
const {MongoClient} = require('mongodb');
const multer = require('multer');
const path = require('path');

const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connect = async ()=>{
    await client.connect();
    const db = await client.db('tmp');
    const Product = await db.collection('products');

    return Product;
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname));
    }
});

// single field & single file
// const uploads = multer({ storage }).single('thumbnail');

//single field multiple files
// const uploads = multer({ storage }).array('images', 10);

//multiple fields
const uploads = multer({ storage }).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10}
]);

app.post('/insert-data', uploads, async(req, res)=>{
    const Product = await connect();

    const data = req.body;

    if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
    if(req.files.images) data.images = req.files.images.map((image)=> image.filename);

    const response = await Product.insertOne(data);
    res.status(200).json({message: 'success', data: response});
})

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
});