const Product = require("../models/product");

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        
        if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        if(req.files.images) data.images = req.files.images.map((image)=> image.filename);

        const dataToSave = new Product(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: 'success', data: response });
    }
    catch(error){
        if(error.errors && error.errors.price) return res.status(400).json({message:'only number value allow in price field'});
        if(error.errors && error.errors.mrp) return res.status(400).json({message:'only number value allow in mrp field'})
        res.status(500).json({message:'internal server error', error});
    console.log(error);
    }
};

const updateProduct = async (req, res) => {
    try{
        console.log(req.params);
        const oldData = await Product.findOne(req.params);
        if(!oldData) return res.status(404).json({message:'no match found'});

        const data = req.body;
        
        if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        if(req.files.images) data.images = req.files.images.map((image)=> image.filename);

        const response = await Product.updateOne(
            req.params,
            {
                $set:data
            }
        );

        res.status(200).json({message: 'succcess', data: response});


    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    createProduct,
    updateProduct
}