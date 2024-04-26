const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagepath = '/uploads/managerimages';

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type :String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    adminid: {
        type: mongoose.Schema.Types.ObjectId,  
        ref:'admin',  //referencing the Admin model
        required: true
    }
});

const addata = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'..',imagepath));
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

schema.statics.uploadimage = multer({storage:addata}).single('image');
schema.statics.imgpath = imagepath;

const add = mongoose.model('manager',schema);

module.exports = add;