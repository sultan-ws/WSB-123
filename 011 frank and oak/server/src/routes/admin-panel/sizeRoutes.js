const express = require('express');
const { createSize, readSizes } = require('../../controllers/controllers');

const sizeRouter = express.Router();

sizeRouter.post('/add-size', createSize);
sizeRouter.get('/read-sizes', readSizes);

module.exports = sizeRouter;