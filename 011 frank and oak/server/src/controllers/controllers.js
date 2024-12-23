//* Admin Panel */

//Parent Category
const { 
    createParentCategory, 
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory
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
    deleteParentCategory
};