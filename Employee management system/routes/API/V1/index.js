const express = require('express');
const adminController = require('./admin')
const routes = express.Router();

routes.use('/admin', adminController);

routes.use('/manager', require('./manager'));

routes.use('/employee', require('./employee'));

module.exports = routes;