const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategoryRoutes');

const adminRouter = express.Router();
const websiteRouter = express.Router();

adminRouter.use('/parent-category', parentCategoryRouter);

module.exports = {
    adminRouter,
    websiteRouter
}