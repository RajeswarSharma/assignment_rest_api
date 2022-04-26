"use strict";

require("dotenv").config();
const http = require("http");
const app = require("./routes/routes");
const mongoose = require("mongoose");


const databaseUrl = process.env.PROD_DB;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err.message);
  });

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

// Makes sure port is a number 
const normalizePort = (val) => {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || 3000); 
const server = http.createServer(app);
server.on("error",onError);

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})