const express = require('express');
const passport = require('passport');

const routes = express.Router();

const manctrl = require('../../../controller/managercontroller');

const manager = require('../../../model/manager');

routes.post('/login', manctrl.login);

routes.get('/profile',passport.authenticate('manLogin',{failureRedirect:"/manager/failgetdata"}), manctrl.profile);

routes.put('/update',passport.authenticate('manLogin',{failureRedirect:"/manager/failgetdata"}),manager.uploadimage, manctrl.update);

routes.post('/addemployee',passport.authenticate('manLogin',{failureRedirect:"/manager/failgetdata"}),manager.uploadimage, manctrl.addemployee);

routes.get('/viewAllEmployee',passport.authenticate('manLogin',{failureRedirect:"/manager/failgetdata"}), manctrl.viewAllEmployee);

routes.delete('/deleteEmployee/:id',passport.authenticate('manLogin',{failureRedirect:"/manager/failgetdata"}), manctrl.deleteEmployee);

routes.get('/failgetdata', async (req,res) => {
    return res.status(400).json({msg:"first login",status:0,Response:"error"});
});

module.exports = routes;