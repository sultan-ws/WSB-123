const express = require('express');
const fileUploads = require('../../middlewares/multer');
const {
    createProductCategory, 
    readProductCategories,
    readProductCategory,
    updateProductCategory
} = require('../../controllers/controllers');


const productCategoryRouter = express.Router();
productCategoryRouter.use(fileUploads('product-category'))

productCategoryRouter.post('/create-category', createProductCategory);
productCategoryRouter.get('/read-categories', readProductCategories);
productCategoryRouter.get('/read-category/:_id', readProductCategory);
productCategoryRouter.put('/update-category/:_id', updateProductCategory);

module.exports = productCategoryRouter;