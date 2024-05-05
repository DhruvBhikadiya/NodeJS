const model = require('../model/model');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports.register = async (req,res) => {
    try{
        if(req.body){
            const checkUser = await model.findOne({email:req.body.email});
            if(checkUser){
                return res.status(400).json({msg:"user already exist",status:0,response:"error"});
            }
            else{
                var img = ''
                if(req.file){
                    img = model.imgpath + '/' + req.file.filename;
                }
                else{
                    return res.status(400).json({msg:"Please select an image",status:0,response:"error"});
                }
                req.body.password = await bcrypt.hash(req.body.password,10);
                req.body.created_date = await moment().format('lll');
                req.body.updated_date = await moment().format('lll');
                req.body.status = true;
                req.body.image = img;
                let data = await model.create(req.body);
                if(data){
                    return res.status(200).json({msg:"user registered successfully",status:1,response:"success"});
                }
                else{
                    return res.status(400).json({msg:"user not registered",status:0,response:"error"});
                }
            }
        }
        else{
            return res.status(400).json({msg:"Please fill the form",status:0,response:"error"});
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something went wrong",status:0,response:"error"})
    }
}