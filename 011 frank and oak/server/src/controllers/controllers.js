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
    deletedParentCategories
} = require("./admin-panel/parentCategoryControllers");

// color
const { 
    createColor
 } = require("./admin-panel/colorControllers");

module.exports = {
    createParentCategory,
    createColor,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCategory,
    deletedParentCategories
};