const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    description: String,
    thumbnail: String,
    images: Object,
    mrp:Number,
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

productSchema.pre('insertOne', function () {
    this.createdAt = Date.now
});

productSchema.pre('save', function () {
    this.createdAt = Date.now
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;