const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const employee = require('../model/employee');

module.exports.login = async (req,res) => {
    try{
        const employeelogin = await employee.findOne({email:req.body.email});
        if(employeelogin){
            const validpass = await bcrypt.compare(req.body.password,employeelogin.password);
            if(validpass){
                let jwtdata = jwt.sign({'employee':employeelogin},"rnw",{expiresIn:'1h'});
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
        const empldata = await employee.findById(req.user.id);
        if(empldata){
            return res.status(200).json({msg:empldata,status: 1,response:"success"});
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
        req.body.updated_date = moment().format('LLL');
        const empldata = await employee.findByIdAndUpdate(req.user.id,req.body);
        if(empldata){
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