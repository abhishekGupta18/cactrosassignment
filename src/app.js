require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/database");

const app = express();

app.use((req, res) => {
  res.send("hello");
});

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
