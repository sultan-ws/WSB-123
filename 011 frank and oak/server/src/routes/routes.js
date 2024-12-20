const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategoryRoutes');
const colorRouter = require('./admin-panel/colorRoutes');

const adminRouter = express.Router();
const websiteRouter = express.Router();

adminRouter.use('/parent-category', parentCategoryRouter);
adminRouter.use('/colors', colorRouter);

module.exports = {
    adminRouter,
    websiteRouter
}