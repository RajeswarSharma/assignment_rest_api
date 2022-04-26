"use strict";
const { header } = require("express-validator");

exports.reqValidate = [
  header("token").not().isEmpty().withMessage("Authentication token missing"),
];
