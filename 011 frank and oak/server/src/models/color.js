const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    code:String,
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

colorSchema.pre('save', function(){
    this.createdAt = Date.now;
});

colorSchema.pre('insertOne', function(){
    this.createdAt = Date.now;
});

const Color = mongoose.model('colors', colorSchema);

module.exports = Color;