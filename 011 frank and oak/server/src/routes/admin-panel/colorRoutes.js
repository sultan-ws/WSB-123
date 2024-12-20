const express = require('express');
const { createColor } = require('../../controllers/controllers');

const colorRouter = express.Router();

colorRouter.post('/create-color', createColor);

module.exports = colorRouter;