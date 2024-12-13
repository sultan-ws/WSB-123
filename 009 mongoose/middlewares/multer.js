const multer = require("multer");
const path = require("path");

const uploads = multer({storage: multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './uploads');
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + Math.floor(Math.random() * 9999999) + path.extname(file.originalname));
    }
})}).fields([
    {
        name:'thumbnail',
        maxCount:1
    },
    {
        name:'images',
        maxCount:10
    }
]);

module.exports = uploads;
