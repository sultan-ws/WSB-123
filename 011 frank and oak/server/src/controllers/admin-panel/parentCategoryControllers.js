const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async (req, res) => {
    try{
        console.log(req.body);
        const dataToSave = new ParentCategory(req.body);
        const response = await dataToSave.save();
        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern.name === 1) return res.status(400).json({message:'category already exist'});
        res.status(500).json({message: 'internal server error'});
    }
};

const readParentCategories = async (req, res) =>{
    try{
        const data = await ParentCategory.find({ deletedAt: null });
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const updateParentCategoryStatus = async (req, res) =>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        );
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const deleteParentCategory = async (req, res) =>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: { deletedAt: Date.now() }
            }
        );
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const deleteParentCategories = async (req, res) => {
    try{
        const data = await ParentCategory.updateMany(
            { _id: {$in : req.body.categories} },
            {
                $set: { deletedAt: Date.now() }
            }
        );
        res.status(200).json({message:'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const readParentCategory = async (req, res) =>{
    try{
        const data = await ParentCategory.find( req.params);
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const updateParentCategory = async (req, res) => {
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        );

        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const deletedParentCategories = async (req, res) =>{
    try{
        const data = await ParentCategory.find({ deletedAt: { $ne: null } });
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}


module.exports = {
    createParentCategory,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCategory,
    deletedParentCategories
}