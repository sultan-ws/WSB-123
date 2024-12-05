const express = require('express');

const app = express();

const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

const m1 = (req,res, next)=>{console.log('m1 called'); next();};
const m2 = (req,res, next)=>{console.log('m2 called'); next();};
const m3 = (req,res, next)=>{console.log('m3 called'); next();};
const m4 = (req,res, next)=>{console.log('m4 called'); next();};

app.use(m4);
router1.use(m1);
router2.use(m2);
router3.use(m3);

router1.get('/r1', (req, res)=>{res.status(200).send('r1 response')});
router1.get('/r2', (req, res)=>{res.status(200).send('r2 response')});
router1.get('/r3', (req, res)=>{res.status(200).send('r3 response')});
router1.get('/r4', (req, res)=>{res.status(200).send('r4 response')});
router1.get('/r5', (req, res)=>{res.status(200).send('r5 response')});
router2.get('/r6', (req, res)=>{res.status(200).send('r6 response')});
router2.get('/r7', (req, res)=>{res.status(200).send('r7 response')});
router2.get('/r8', (req, res)=>{res.status(200).send('r8 response')});
router3.get('/r9', (req, res)=>{res.status(200).send('r9 response')});
router3.get('/r10', (req, res)=>{res.status(200).send('r10 response')});
router3.get('/r11', (req, res)=>{res.status(200).send('r11 response')});
router3.get('/r12', (req, res)=>{res.status(200).send('r12 response')});

app.use('/type1',router1);
app.use('/type2',router2);
app.use('/type3',router3);

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});