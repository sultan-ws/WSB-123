const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/files', express.static('./uploads'));

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
});

app.get('/read-data',async (req, res) => {
    const Product = await connect();
    const response = await Product.find().toArray();
    const filepath = 'http://localhost:5000/files/';

    const finalResponse = response.map((data)=>{
        data.thumbnail = filepath + data.thumbnail;
        data.images = data.images.map((image)=> filepath + image);

        return data;
    });

    res.status(200).json({message: 'success', data: finalResponse, filepath});
});

app.put('/update-data/:id', uploads, async ( req, res ) => {
    const Product = await connect();
    const oldData = await Product.find({ _id: new ObjectId(req.params.id) }).toArray();

    if(oldData.length === 0) return res.status(404).json({message: 'no match found'});

    const data = req.body;

    if(req.files.thumbnail) {
        if(oldData[0].thumbnail) fs.unlinkSync(`./uploads/${oldData[0].thumbnail}`);
        data.thumbnail = req.files.thumbnail[0].filename;
    }

    if(req.files.images){
        if(oldData[0].images) oldData[0].images.map((img)=>{ fs.unlinkSync(`./uploads/${img}`) });
        data.images = req.files.images.map((image)=> image.filename);
    };

    const response = await Product.updateOne(
        {_id: new ObjectId(req.params.id)},
        {
            $set:data
        }
    );

    res.status(200).json({message: 'success', data: response});
});

app.delete('/delete-data/:id', async ( req, res ) => {
    const Product = await connect();

    const oldData = await Product.find({ _id: new ObjectId(req.params.id) }).toArray();

    if(oldData.length === 0) return res.status(404).json({message: 'no match found'});

    if(oldData[0].thumbnail) fs.unlinkSync(`./uploads/${oldData[0].thumbnail}`);
    if(oldData[0].images) oldData[0].images.map((img)=>{ fs.unlinkSync(`./uploads/${img}`) });

    const response = await Product.deleteOne({ _id: new ObjectId(req.params.id)});
    
    res.status(200).json({ message: 'success', data: response });
});

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
});