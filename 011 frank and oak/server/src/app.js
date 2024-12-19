const express = require('express');
const { adminRouter, websiteRouter } = require('./routes/routes');

const masterRouter = express.Router();

masterRouter.use('/admin-panel', adminRouter);
masterRouter.use('/website', websiteRouter);

module.exports = masterRouter;