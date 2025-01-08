const Product = require("../../models/product");

const createProduct = async (req, res) => {
    try {
        const data = req.body;

        if(req.files.thumbanil) data.thumbanil = req.files.thumbanil[0].filename;
        if(req.files.hoverThumbanil) data.hoverThumbanil = req.files.hoverThumbanil[0].filename;
        if(req.files.gallery) data.gallery = req.files.gallery.map((img) => img.filename);

        const dataToSave = new Product(data);
        const response = await dataToSave.save();

        res.status(200).json({message:'success', data: response});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' })
    }
};

module.exports = {
    createProduct
}