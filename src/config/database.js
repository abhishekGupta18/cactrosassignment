require("dotenv").config();

const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(process.env.DB_SECRET);
};

module.exports = connectToDB;
