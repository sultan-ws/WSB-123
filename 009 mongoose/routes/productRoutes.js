const express = require('express');
const uploads = require('../middlewares/multer');
const { createProduct, updateProduct } = require('../controllers/product');

const productRouter = express.Router();

productRouter.post('/insert-product', uploads, createProduct);
productRouter.put('/update-product/:_id',uploads, updateProduct)

module.exports = productRouter;