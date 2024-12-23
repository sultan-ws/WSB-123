const express = require('express');
const multer = require('multer');
const { 
    createParentCategory, 
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();
parentCategoryRouter.use(multer().none());

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategories);
parentCategoryRouter.put('/update-category-status/:_id', updateParentCategoryStatus);
parentCategoryRouter.put('/delete-category/:_id', deleteParentCategory);

module.exports = parentCategoryRouter;