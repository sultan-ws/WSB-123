const Color = require("../../models/color");

const createColor = async (req, res) => {
    try{
        const dataToSave = new Color(req.body);
        const data = await dataToSave.save();
        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern.name === 1) return res.status(400).json({message:'color already exist'});
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    createColor
}