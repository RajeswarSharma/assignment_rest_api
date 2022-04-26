"use strict";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        addressline1:{
            type:String,
            required:true,
        },
        addressline2:{
            type:String,
            default:""
        },
        state:{
            type:String,
            required:true,
        },
        postal_code:{
            type:String,
            required:true,
        }
    },
    
});

module.exports = mongoose.model("user",userSchema);