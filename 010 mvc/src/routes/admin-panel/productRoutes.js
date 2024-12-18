const express = require('express');
const { viewProduct } = require('../../controllers/controllers');

const productRouter = express.Router();

productRouter.get('/read-products', viewProduct);

module.exports = productRouter;