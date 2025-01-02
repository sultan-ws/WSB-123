const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategoryRoutes');
const colorRouter = require('./admin-panel/colorRoutes');
const productCategoryRouter = require('./admin-panel/productCategoryRoutes');
const adminRoutes = require('./admin-panel/adminRoutes');

const adminRouter = express.Router();
const websiteRouter = express.Router();

adminRouter.use('/parent-category' ,parentCategoryRouter);
adminRouter.use('/colors', colorRouter);
adminRouter.use('/product-category', productCategoryRouter);
adminRouter.use('/admin', adminRoutes);

module.exports = {
    adminRouter,
    websiteRouter
}