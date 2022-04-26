"use strict";

const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
   
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(401).json({
            status:false,
            message:validationErrors.array()[0]
        });
    }

    let { token } = req.headers;
    let publicKey = fs.readFileSync(path.join(__dirname,"../keys/public.key"),"utf8");
    let verificationOption = {
      issuer: "rajeswar",
      algorithm: ["RS256"],
      expiresIn: "24h",
    };
    
    let isValid = jwt.verify(token,publicKey,verificationOption);
    if(!isValid){
        return res.status(401).json({
            status:false,
            message:"invalid session"
        });
    }
    // resolving token to session data
    req.headers.token = isValid.uid;
   
    return next();
  
} catch (error) {
     
  console.log(error.message);
      if ((error.message = "invalid signature")){
          return res.status(401).json({
            status: false,
            message: "unauthorized",
          });
      }
        return res.status(500).json({
          status: false,
          message: "internal server error",
        });
  }
};
module.exports = {auth};
