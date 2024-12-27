const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    slug:{
        type: String, 
        required: true 
    },
    thumbnail: String,
    parentCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categories',
    },
    description: String,
    isFeatured:{
        type: Boolean,
        default: false
    },
    status:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    deletedAt:{
        type: Date,
        default: null
    }
});

categorySchema.pre('save', function(){
    this.createdAt = Date.now;
});

categorySchema.pre('insertOne', function(){
    this.createdAt = Date.now;
});

const ProductCategory = mongoose.model('product_categories', categorySchema);

module.exports = ProductCategory;