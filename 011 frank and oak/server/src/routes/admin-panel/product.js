const express = require('express');
const { createProduct } = require('../../controllers/controllers');

const productRouter = express.Router();

productRouter.post('/insert-product', createProduct);

module.exports = productRouter;