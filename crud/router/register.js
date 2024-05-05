const express = require('express');

const routes = express.Router();

const ctrl = require('../controller/controller');

routes.post('/register',ctrl.register);

module.exports = routes;