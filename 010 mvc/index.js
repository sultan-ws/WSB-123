const express = require('express');
const masterRouter = require('./src/app');
require('dotenv').config();

const app = express();

app.use('/api', masterRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});