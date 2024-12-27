const express = require('express');
const fileUploads = require('../../middlewares/multer');
const {
    createProductCategory 
} = require('../../controllers/controllers');


const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category', fileUploads('product-category'), createProductCategory);

module.exports = productCategoryRouter;