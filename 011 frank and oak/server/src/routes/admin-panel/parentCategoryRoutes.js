const express = require('express');
const multer = require('multer');
const { 
    createParentCategory, 
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCategory,
    deletedParentCategories,
    restoreParentCategory,
    restoreParentCategories
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();
parentCategoryRouter.use(multer().none());

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategories);
parentCategoryRouter.put('/update-category-status/:_id', updateParentCategoryStatus);
parentCategoryRouter.put('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', deleteParentCategories);
parentCategoryRouter.get('/read-category/:_id', readParentCategory);
parentCategoryRouter.put('/update-category/:_id', updateParentCategory);
parentCategoryRouter.get('/deleted-categories', deletedParentCategories);
parentCategoryRouter.put('/restore-category/:_id', restoreParentCategory);
parentCategoryRouter.put('/restore-categories', restoreParentCategories);

module.exports = parentCategoryRouter;