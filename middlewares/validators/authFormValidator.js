"use strict";
const {body} = require("express-validator");

exports.signupForm = [
    body("email").not().isEmpty().withMessage("require email id").isEmail().withMessage("invalid email format"),
    body("phone").not().isEmpty().withMessage("require phone number").isMobilePhone().withMessage("invalid phone number"),
    body("password1").not().isEmpty().withMessage("require password"),
    body("password2").not().isEmpty().withMessage("require password"),
    body("firstname").not().isEmpty().withMessage("require firstname").isAlpha().withMessage("invalid character"),
    body("lastname").not().isEmpty().withMessage("require lastname").isAlpha().withMessage("invalid character"),
    body("addressline1").not().isEmpty().withMessage("require address-line 1"),
    body("state").not().isEmpty().withMessage("require state"),
    body("postal_code").not().isEmpty().withMessage("require postal code"),

];

exports.loginForm = [
    body("email").not().isEmpty().withMessage("require email").isEmail().withMessage("require a valid email"),
    body("password").not().isEmpty().withMessage("require password"),
]