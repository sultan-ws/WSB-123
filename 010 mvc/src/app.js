const express = require('express');
const { adminPanelRouter, wesbiteRouter } = require('./routes/routes');

const masterRouter = express.Router();

masterRouter.use('/admin-panel', adminPanelRouter);
masterRouter.use('/website', wesbiteRouter);

module.exports = masterRouter;