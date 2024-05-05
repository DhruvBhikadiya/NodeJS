const model = require('../model/model');

module.exports.register = async (req,res) => {
    try{
        const data = await model.findOne({email:req.body.email});
        if(data){
            return res.status(400).json({msg:"user already exist",status:0,response:"error"});
        }
        else{

        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"something went wrong",status:0,response:"error"})
    }
}