const express = require('express');
const productRouter = require('./routes/productRoutes');
require('./db/config');


const app = express();
app.use('/products', productRouter);

app.listen(5200, () => {
    console.log('server is running on port 5200');
});