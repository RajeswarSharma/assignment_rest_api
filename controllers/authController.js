"use strict";
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const valisationErrors = validationResult(req);
    if (!valisationErrors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: valisationErrors.array()[0],
      });
    }
    let {
      firstname,
      lastname,
      email,
      phone,
      password1,
      password2,
      addressline1,
      addressline2,
      state,
      postal_code,
    } = req.body;

    if (password1 !== password2) {
      return res.status(422).json({
        status: false,
        message: "password 1 and password 2 are not equal",
      });
    }

    let salt = await bcrypt.genSalt(12);
    password1 = await bcrypt.hash(password1, salt);
    addressline2 = addressline2 ? addressline2 : "";

    await userModel.create({
      firstname,
      lastname,
      email,
      phone,
      address: {
        addressline1,
        addressline2,
        state,
        postal_code,
      },
      password: password1,
    });

    return res.json({
      status: true,
      message: "registered!",
    });
    
  } catch (error) {
    
    if (error.code === 11000) {
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
};

const login = async (req, res) => {
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: validationErrors.array()[0],
    });
  }
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user)
    return res.status(401).json({
      status: false,
      message: "Invalid email or password",
    });

  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res.status(401).json({
      status: true,
      message: "Invalid email or password",
    });

  let privateKey = fs.readFileSync(path.join(__dirname, "../keys/private.key"),"utf8");
  let signOption = {
    issuer: "rajeswar",
    algorithm: "RS256",
    expiresIn: "24h",
  };
  let payload = {
    uid: user._id,
  };
  let token = await jwt.sign(payload, privateKey, signOption);

  return res.json({ status: true, token });
};
module.exports = { register, login };
