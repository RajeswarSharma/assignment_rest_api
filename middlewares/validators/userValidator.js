"use strict";
const {param,body,query} = require("express-validator");

exports.getAllUser = [param("page").isInt().withMessage("invalid page number")];

exports.updateUser = [
    body("email").not().isEmpty().withMessage("require email id").isEmail().withMessage("invalid email format"),
    body("phone").not().isEmpty().withMessage("require phone number").isMobilePhone().withMessage("invalid phone number"),
    body("firstname").not().isEmpty().withMessage("require firstname").isAlpha().withMessage("invalid character"),
    body("lastname").not().isEmpty().withMessage("require lastname").isAlpha().withMessage("invalid character"),
    body("addressline1").not().isEmpty().withMessage("require address-line 1"),
    body("state").not().isEmpty().withMessage("require state"),
    body("postal_code").not().isEmpty().withMessage("require postal code"),
]

exports.search = [
    query("page").not().isEmpty().withMessage("require page number").isInt().withMessage("page number must be an Int"),
    query("key").not().isEmpty().withMessage("require search key")
]