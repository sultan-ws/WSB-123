const express = require('express');
const productRouter = require('./admin-panel/productRoutes');

const adminPanelRouter = express.Router();
const wesbiteRouter = express.Router();

adminPanelRouter.use('/product', productRouter);


module.exports = {
    adminPanelRouter,
    wesbiteRouter
}