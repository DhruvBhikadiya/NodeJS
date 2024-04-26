const express = require('express');
const passport = require('passport');
const {check, validationresult} = require('express-validator');

const routes = express.Router();

const adminctrl = require('../../../controller/admincontroller');

const manager = require('../../../model/manager');

routes.post('/register', adminctrl.register);

routes.post('/login'[
    check('email',"Invalid email").isEmail().length({min:10, max: 30}),
    check('password',"Password length 8-10").isLength({min:8,max:10})
], adminctrl.login);

routes.post('/manageradd',passport.authenticate('jwt',{failureRedirect:"/admin/failgetdata"}), manager.uploadimage, adminctrl.manageradd);

routes.get('/viewAllManager',passport.authenticate('jwt',{failureRedirect:"/admin/failgetdata"}), adminctrl.viewAllManager);

routes.delete('/deleteManager/:id',passport.authenticate('jwt',{failureRedirect:"/admin/failgetdata"}), adminctrl.deleteManager);

routes.get('/viewAllEmployee',passport.authenticate('jwt',{failureRedirect:"/admin/failgetdata"}), adminctrl.viewAllEmployee);

routes.delete('/deleteEmployee/:id',passport.authenticate('jwt',{failureRedirect:"/admin/failgetdata"}), adminctrl.deleteEmployee);

routes.get('/failgetdata', async (req,res) => {
    return res.status(400).json({msg:"first login",status:0,Response:"error"});
});

module.exports = routes;