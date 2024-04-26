const mongoose = require('mongoose');

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
    location : {
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
    managerid: {
        type: mongoose.Schema.Types.ObjectId,  
        ref:'manager',  //referencing the Admin model
        required: true
    }
});

const add = mongoose.model('employee',schema);  //creating the collection

module.exports = add;