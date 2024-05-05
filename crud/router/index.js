const express = require('express');

const routes = express.Router();

routes.use('/',require('./register'));

module.exports = routes;