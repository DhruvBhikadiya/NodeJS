const express = require('express');
const passport = require('passport');

const routes = express.Router();

const emplctrl = require('../../../controller/employeecontroller');

const employee = require('../../../model/employee');

routes.post('/login', emplctrl.login);

routes.get('/profile',passport.authenticate('emplLogin',{failureRedirect:"/employee/failgetdata"}), emplctrl.profile);

routes.put('/update',passport.authenticate('emplLogin',{failureRedirect:"/employee/failgetdata"}), emplctrl.update);

routes.get('/failgetdata', async (req,res) => {
    return res.status(400).json({msg:"You have to first login",status:0,Response:"error"});
});

module.exports = routes;