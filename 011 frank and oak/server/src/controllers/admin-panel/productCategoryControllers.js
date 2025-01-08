const ProductCategory = require("../../models/productCategory");
const fs = require('fs');

const createProductCategory = async(req, res)=>{
    try{
        const data = req.body;

        if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        
        const dataToSave = new ProductCategory(data);
        const response = await dataToSave.save();

        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const readProductCategories = async ( req, res ) => {
    try{
        const data = await ProductCategory.find({ deletedAt: null}).populate('parentCategory');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({message:'success', data, filepath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const readProductCategory = async (req, res)=>{
    try{
        const data = await ProductCategory.findOne(req.paramas).populate('parentCategory');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({message:'success', data, filepath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const updateProductCategory = async (req, res) => {
    try{
        const preData = await ProductCategory.findOne(req.paramas);
        if(!preData) return res.status(404).json({message: 'no match found'});

        const data = req.body;

        if(req.files.thumbnail){
            data.thumbnail = req.files.thumbnail[0].filename;
            const filepath = `./src/files/product-category/${preData.thumbnail}`;

            if(fs.existsSync(filepath)) fs.unlinkSync(filepath)
        }
        
        const response = await ProductCategory.updateOne(
            req.paramas,
            { $set: data }
        );

        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const productCategoryByParentCategory = async(req, res) => {
    try{
        const data = await ProductCategory.find({
            parentCategory: req.params.id,
            deletedAt:null,
            status:true
        });
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

module.exports = {
    createProductCategory,
    readProductCategories,
    readProductCategory,
    updateProductCategory,
    productCategoryByParentCategory
}