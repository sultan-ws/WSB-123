const express = require('express');
const multer = require('multer');
const { 
    createParentCategory 
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();
parentCategoryRouter.use(multer().none());

parentCategoryRouter.post('/create-category', createParentCategory);

module.exports = parentCategoryRouter;