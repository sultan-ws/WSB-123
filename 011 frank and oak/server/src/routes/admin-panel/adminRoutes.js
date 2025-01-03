const express = require('express');
const { adminLogin } = require('../../controllers/controllers');
const multer = require('multer');
const { updateAdmin } = require('../../controllers/admin-panel/adminControllers');
const fileUploads = require('../../middlewares/multer');

const adminRoutes = express.Router();
adminRoutes.use(fileUploads('admin'));

adminRoutes.post('/login', adminLogin);
adminRoutes.put('/update-admin', updateAdmin);

module.exports = adminRoutes;