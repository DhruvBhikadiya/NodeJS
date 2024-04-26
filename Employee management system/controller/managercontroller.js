const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const manager = require('../model/manager');
const employee = require('../model/employee');

module.exports.login = async (req,res) => {
    try{
        const managerlogin = await manager.findOne({email:req.body.email});
        if(managerlogin){
            const validpass = await bcrypt.compare(req.body.password,managerlogin.password);
            if(validpass){
                let jwtdata = jwt.sign({'manager':managerlogin},"rnw",{expiresIn:'1h'});
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

module.exports.profile = async (req,res) => {
    try{
        const mandata = await manager.findById(req.user.id);
        if(mandata){
            return res.status(200).json({msg:mandata,status: 1,response:"success"});
        }
        else{
            return res.status(400).json({msg:"Data not found",status: 0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"Something wrong",status: 0,response:"error"});
    }
};

module.exports.update = async (req,res) => {
    try{
        var img = '';
        const managerdata = await manager.findById(req.user.id);
        if(req.file){
            img = manager.imgpath + '/' +req.file.filename;
            imgpath = path.join(__dirname,'..',managerdata.image);
            console.log(imgpath);
            try{
                fs.unlinkSync(imgpath);
            }
            catch(e){
                return res.status(400).json({msg:"something wrong",status: 0,response:"error"});
            }
        }
        else{
            img = managerdata.image;
        }
        req.body.image = img;
        req.body.updated_date = moment().format('LLL');
        const mandata = await manager.findByIdAndUpdate(req.user.id,req.body);
        if(mandata){
            return res.status(200).json({msg:"successfully updated",status: 1,response:"success"});
        }
        else{
            return res.status(400).json({msg:"Data not found",status: 0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something wrong",status: 0,response:"error"});
    }
};

module.exports.addemployee = async (req,res) => {
    try{
        if(req.body){
            req.body.role = "employee";
            req.body.created_date = moment().format("LLL");
            req.body.updated_date = moment().format("LLL");
            req.body.status = true;
            password = req.body.name + "@" + Math.round(Math.random()*100000);
            req.body.password = await bcrypt.hash(password,10);
            req.body.managerid = req.user.id;
            const employeedata = await employee.create(req.body);
            if(employeedata){
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
                return res.status(200).json({msg:"Data inserted",status:1,response:"success"});
            }
            else{
                return res.status(400).json({msg:"Data not inserted",status:0,response:"error"});
            }
        }
        else{
            req.status(400).json({msg:"Please fill the form",status: 0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"somethig wrong",status:0,response:"error"});
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