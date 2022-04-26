"use strict";
const router = require("express").Router();
const authController = require("../../controllers/authController");
const authValidator = require("../../middlewares/validators/authFormValidator");
// router.post(
//   "/login",
//   manageAuthValidator.validate_login_form,
//   manageAuthController.login
// );

router.post("/signup", authValidator.signupForm, authController.register);
router.post("/login", authValidator.loginForm, authController.login);

module.exports = router;
