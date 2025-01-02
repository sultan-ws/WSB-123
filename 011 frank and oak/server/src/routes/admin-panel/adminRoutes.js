const express = require('express');
const { adminLogin } = require('../../controllers/controllers');
const multer = require('multer');

const adminRoutes = express.Router();
adminRoutes.use(multer().none());

adminRoutes.post('/login', adminLogin);

module.exports = adminRoutes;