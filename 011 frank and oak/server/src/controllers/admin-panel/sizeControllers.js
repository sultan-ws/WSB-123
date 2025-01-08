const Size = require("../../models/size");

const createSize = async (req, res) => {
    const data = new Size(req.body);
    const response = await data.save();
    res.status(200).json({ message: 'success', data: response });
};

const readSizes = async (req, res) =>{
    try{
        const response = await Size.find();
        res.status(200).json({ message: 'success', data: response });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'error', data: error });
    }
}

module.exports = {
    createSize,
    readSizes
}