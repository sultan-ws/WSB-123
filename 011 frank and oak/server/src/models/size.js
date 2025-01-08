const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    order:String,
    status:Number,
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

sizeSchema.pre('save', function(){
    this.createdAt = Date.now;
});

sizeSchema.pre('insertOne', function(){
    this.createdAt = Date.now;
});

const Size = mongoose.model('sizes', sizeSchema);

module.exports = Size;