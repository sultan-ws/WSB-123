const multer = require('multer');
const path = require('path');

const storage = (filename)=> multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./src/files/${filename}`);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname));
    }
});

const fileUploads = (filename)=> multer({ storage: storage(filename) }).fields([
    {
        name: 'thumbnail',
        maxCount: 1
    },
    {
        name: 'profile',
        maxCount: 1
    },
    {
        name: 'logo',
        maxCount: 1
    },
    {
        name: 'favicon',
        maxCount: 1
    },
    {
        name: 'footer_icon',
        maxCount: 1
    },
    {
        name:'hoverThumbnail',
        maxCount: 1
    },
    {
        name:'gallery',
        maxCount: 10
    }
]);

module.exports = fileUploads;