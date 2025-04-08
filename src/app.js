require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const authRouter = require("./routes/auth");
const cokkieParser = require("cookie-parser");

app.use(express.json());
app.use(cokkieParser());

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "cactro's assignment Backend is Running!",
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
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
