require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/database");

const app = express();

connectToDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("DB connection failed: " + e.message);
  });
