//* Admin Panel */

//Parent Category
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
    restoreParentCategories,
    activeParentCategories
} = require("./admin-panel/parentCategoryControllers");

// color
const { 
    createColor,
    activeColors
 } = require("./admin-panel/colorControllers");

 // product category
const { 
    createProductCategory,
    readProductCategories,
    readProductCategory,
    updateProductCategory,
    productCategoryByParentCategory,
} = require("./admin-panel/productCategoryControllers");
const { createAdmin, adminLogin, genrateOtp, updateEmail } = require("./admin-panel/adminControllers");
const { readSizes, createSize } = require("./admin-panel/sizeControllers");
const { createProduct } = require("./admin-panel/product");

module.exports = {
    createParentCategory,
    createColor,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCategory,
    deletedParentCategories,
    restoreParentCategory,
    restoreParentCategories,
    activeParentCategories,
    createProductCategory,
    readProductCategories,
    readProductCategory,
    updateProductCategory,
    createAdmin,
    adminLogin,
    genrateOtp,
    updateEmail,
    activeColors,
    createSize,
    readSizes,
    productCategoryByParentCategory,
    createProduct
};