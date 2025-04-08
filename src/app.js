require("dotenv").config();
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("hii hello");
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
