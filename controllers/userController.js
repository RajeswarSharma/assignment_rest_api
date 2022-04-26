"use strict";
const userModel = require("../models/userModel");
const {validationResult} = require("express-validator");
const PER_PAGE = 5;

const getAllUsers = async (req,res)=>{

    try {
     let user_id = req.headers.token
     let {page} = req.params;
     let mUser = await userModel.findById(user_id,{firstname:1,lastname:1,email:1});
     if(!mUser) return res.status(401).json({
         status:false,
         message:"invalid session"
     });

     let total = await userModel.countDocuments();
     let max_pages = parseInt(total/PER_PAGE);
     max_pages += total%PER_PAGE?1:0;

     let allUsers = await userModel.find({},{firstname:1,lastname:1}).limit(PER_PAGE).skip(PER_PAGE*page).lean();
    
     return res.json({
         status:true,
         max_pages,
         requested_page: `${parseInt(page)+1} / ${max_pages}`,
         paylaod:allUsers
     });
     
 } catch (error) {
     console.log(error);
     return res.status(500).json({
         status:false,
         message:"internal server error"
     })
 }
}

const updateUserDetails = async (req,res)=>{
 try {
   
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({
            status:false,
            message:validationErrors.array()[0]
        })
    }
    
    let author = req.headers.token;

    let {firstname,lastname,email,phone,addressline1,addressline2,state,postal_code} = req.body;
    let oldUser = await userModel.findById(author,{_id:1});
    if(!oldUser){
        return res.status(401).json({
          status: false,
          message: "unauthorized",
        });
    }
   
    await userModel.updateOne({_id:author},{$set:{
        firstname,
        lastname,
        phone,
        email,
        address:{
            addressline1,
            addressline2,
            state,
            postal_code
        }
    }});

    return res.json({
        status:true,
        message:"Updated!"
    })

 } catch (error) {
    
    if (error.code === 11000){
        return res.status(400).json({
          status: false,
          message: `Duplicate ${JSON.stringify(error.keyValue)}`,
        });
    }
    
    console.log(error);
    return res.status(500).json({
        status: false,
        message: "Internal server error",
      }); 
 }

}

const search = async (req,res)=>{
    try {
      
        let validationErrors = validationResult(req);
      
        if(!validationErrors.isEmpty()){
            return res.status(422).json({
                status:false,
                message:validationErrors.array()[0]
            })
        }

        let {key,page} = req.query;
       
        let searchQuery = {
            $or:[
                {email:{$regex: `^${key}`}},
                {phone:{$regex: `^${key}`}},
                {firstname:{$regex: `^${key}`}},
                {lastname:{$regex: `^${key}`}},
            ]
        };
        
        let total = await userModel.countDocuments(searchQuery);
        let max_pages = parseInt(total/PER_PAGE);
        max_pages += total%PER_PAGE?1:0;

        let payload = await userModel.find(searchQuery,{firstname:1,lastname:1,email:1,phone:1}).limit(PER_PAGE).skip(PER_PAGE*page).lean();
       
        return res.json({
            status:true,
            requested_page: `${parseInt(page)+1} / ${max_pages}`,
            max_pages,
            payload,

        })
    } catch (error) {
       
        console.log(error);
       
        return res.status(500).json({
            status:false,
            message:"internal server error"
        })
    }
}
module.exports = { getAllUsers, updateUserDetails,search};