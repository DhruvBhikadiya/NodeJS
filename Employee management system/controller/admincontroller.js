const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const nodemailer = require('nodemailer');
const {check, validationresult} = require('express-validator');

// Models

const admin = require('../model/admin');
const manager = require('../model/manager');
const employee = require('../model/employee');
const passport = require('passport');

module.exports.register = async (req,res) => {
    try{
        if(req.body){
            const checkemail = await admin.findOne({email:req.body.email});
            if(!checkemail){
                req.body.password = await bcrypt.hash(req.body.password,10);
                let adminregister = await admin.create(req.body);
                if(adminregister){
                    return res.status(200).json({msg:"Data inserted",status: 1,responce:"success"});
                }
                else{
                    return res.status(400).json({msg:"Data not inserted",status: 0,responce:"error"});
                }
            }
            else{
                return res.status(400).json({msg:"Email allready exist",status: 0,responce:"error"});
            }
        }
        else{
            return res.status(400).json({msg:"Please fill the form",status: 0,responce:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"Something wrong",status: 0,responce:"error"});
    }
};

module.exports.login = async (req,res) => {
    try{
        const error = validationresult(req);
        const adminlogin = await admin.findOne({email:req.body.email});
        if(adminlogin){
            const validpass = await bcrypt.compare(req.body.password,adminlogin.password);
            if(validpass){
                let jwtdata = jwt.sign({'admin':adminlogin},"rnw",{expiresIn:'1h'});
                return res.status(200).json({msg:"successfully login",status:1,response:"success0",LoginData:jwtdata});
            }
            else{
                return res.status(400).json({msg:"Password not matched",status:0,response: "Error"});
            }
        }
        else{
            return res.status(400).json({msg:'User doesnot exists',status:0,response:"Error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"Something wrong",status: 0,response:"error"});
    }
};

module.exports.manageradd = async (req,res) => {
    try{
        if(req.body){
            var img = '';
            if(req.file){
                img = manager.imgpath + '/' + req.file.filename;
            }
            req.body.image = img;
            req.body.status = true;
            req.body.created_date = moment().format('LLL');
            req.body.updated_date = moment().format('LLL');
            req.body.role = 'manager';
            password = req.body.name+ "@" + Math.round(Math.random()*100000);
            req.body.password = await bcrypt.hash(password,10);
            req.body.adminid = req.user.id;

            let mandata = await manager.create(req.body);
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "dhruv.bhikadiya@gmail.com",
                    pass: "fezmlqwotiugxfoc",
                },
            });

            otp = Math.round(Math.random()*1000000);
            res.cookie('otp',otp);
            res.cookie('email',req.body.email);
            message = `<h3>Email :- ${req.body.email}</h3><br/><h3>Password :- ${password}</h3>`;

            const info = await transporter.sendMail({
                from: 'dhruvbhikadiya114@gmail.gom', // sender address
                to: req.body.email, // list of receivers
                subject: "Email id", // Subject line
                text: "Hello world?", // plain text body
                html: message, // html body
            });
            if(mandata){
                return res.status(200).json({msg:"Data inserted",status: 1,response:"success"});
            }
            else{
                return res.status(400).json({msg:"Data not inserted",status: 0,response:"error"});
            }

        }
        else{
            return res.status(400).json({msg:"please fill the form",status: 0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something wrong",status: 0,response:"error"});
    }
};

module.exports.viewAllManager = async (req,res) => {
    try{
        const mandata = await manager.find({});
        if(mandata){
            return res.status(200).json({msg:mandata,status: 1,responce:"success"});
        }
        else{
            return res.status(400).json({msg:"data not found",status: 0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something wrong",status: 0,response:"error"});
    }
};

module.exports.deleteManager = async (req,res) => {
    try{
        const deldata = await manager.findByIdAndDelete(req.params.id);
        if(deldata){
            return res.status(200).json({msg:"Manager deleted",status:1,response:"success"});
        }
        else{
            return res.status(400).json({msg:"Manager not found",status:0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something wrong",status:0,response:"error"});
    }
};

module.exports.viewAllEmployee = async (req,res) => {
    try{
        const empldata = await employee.find({});
        if(empldata){
            return res.status(200).json({msg:empldata,status: 1,responce:"success"});
        }
        else{
            return res.status(400).json({msg:"data not found",status: 0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something wrong",status: 0,response:"error"});
    }
};

module.exports.deleteEmployee = async (req,res) => {
    try{
        const deldata = await employee.findByIdAndDelete(req.params.id);
        if(deldata){
            return res.status(200).json({msg:"Employee deleted",status:1,response:"success"});
        }
        else{
            return res.status(400).json({msg:"Employee not found",status:0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something wrong",status:0,response:"error"});
    }
};