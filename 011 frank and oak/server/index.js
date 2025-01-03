const express = require('express');
const masterRouter = require('./src/app');
require('dotenv').config();
require('./src/db/config');
const cors = require('cors');

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/frankandoak-files', express.static('./src/files/product-category'));
app.use('/frankandfiles/admin', express.static('./src/files/admin'));

app.use('/api', masterRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});