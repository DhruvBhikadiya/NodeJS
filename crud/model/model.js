const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagepath = '/uploads/images';

const schema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    hobby: {
        type:Array,
        required:true
    },
    created_date: {
        type:String,
        required:true
    },
    updated_date: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true
    }
});

const addata = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,path.join(__dirname,'..',imagepath));
    },
    filename:(req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now());
    }
});

schema.statics.uploadimage = multer({storage:addata}).single('image');
schema.statics.imgpath = imagepath;

const add = mongoose.model('crudnodepract',schema);

module.exports = add;