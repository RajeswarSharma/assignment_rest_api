"use strict";
const router = require("express").Router();
const authHeader = require("../../middlewares/validators/authHeaderValidation");
const authToken = require("../../middlewares/authToken");
const userController = require("../../controllers/userController");
const userValidator = require("../../middlewares/validators/userValidator");

router.get(
  "/get-all-users/:page",
  authHeader.reqValidate,
  userValidator.getAllUser,
  authToken.auth,
  userController.getAllUsers
);

router.put(
  "/update-details",
  authToken.auth,
  userValidator.updateUser,
  userController.updateUserDetails
);

router.get(
  "/search",
  authToken.auth,
  userValidator.search,
  userController.search
);

module.exports = router;
