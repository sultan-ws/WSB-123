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

module.exports = {
    createParentCategory
}