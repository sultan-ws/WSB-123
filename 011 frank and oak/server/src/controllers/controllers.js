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
    createColor
 } = require("./admin-panel/colorControllers");

 // product category
const { 
    createProductCategory,
    readProductCategories,
    readProductCategory,
    updateProductCategory,
} = require("./admin-panel/productCategoryControllers");

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
    updateProductCategory
};