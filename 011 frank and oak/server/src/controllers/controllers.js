//* Admin Panel */

//Parent Category
const { 
    createParentCategory 
} = require("./admin-panel/parentCategoryControllers");

// color
const { 
    createColor
 } = require("./admin-panel/colorControllers");

module.exports = {
    createParentCategory,
    createColor
};