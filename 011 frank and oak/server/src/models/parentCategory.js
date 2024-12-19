const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:String,
    description:String,
    status:{
        type: Boolean,
        default:true
    },
    createdAt:Date,
    updatedAt:{
        type:Date,
        default:Date.now
    },
    deletedAt:{
        type:Date,
        default:null
    }
});

categorySchema.pre('save', function(){
    this.createdAt = Date.now;
});

categorySchema.pre('insertOne', function(){
    this.createdAt = Date.now;
});

const ParentCategory = mongoose.model('parent_categories', categorySchema);

module.exports = ParentCategory;