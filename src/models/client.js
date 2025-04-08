require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email id");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("invaid gender type");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.methods.getJwtToken = async function () {
  client = this;
  const token = await jwt.sign(
    { _id: client._id },
    process.env.jwt_token_secret,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

clientSchema.methods.validatePassword = async function (passwordInputByclient) {
  client = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByclient,
    client.password
  );

  return isPasswordValid;
};

const Client = mongoose.model("client", clientSchema);
module.exports = Client;
