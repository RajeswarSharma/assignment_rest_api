"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const authAPIs = require("./libs/auth")
const userAPIs = require("./libs/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ limit: "200mb" }));
app.use(cors());
app.use(express.static("docs"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// APIs
app.use("/api",authAPIs);
app.use("/api",userAPIs);
//~APIs`

module.exports = app
