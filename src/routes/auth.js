const express = require("express");
const validateSignUpData = require("../utilities/validation");
const bcrypt = require("bcrypt");
const Client = require("../models/client");

const authRouter = express.Router();

// signUp Api

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, password, email } = req.body;
    const encodedPassword = await bcrypt.hash(password, 8);

    const client = new Client({
      firstName,
      lastName,
      password: encodedPassword,
      email,
    });

    const token = await client.getJwtToken();

    res.cookie("token", token);

    await client.save();
    res.json({
      message: "client added successfully!!",
      data: client,
      token: token,
    });
  } catch (e) {
    res.status(400).send("client is not added" + e.message);
  }
});

// login api

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email: email });

    if (!client) {
      throw new Error("wrong credentials");
    }

    const checkingPassword = await client.validatePassword(password);

    if (checkingPassword) {
      const token = await client.getJwtToken();
      res.cookie("token", token);
      res.json({
        message: "Login successful",
        data: client,
        token: token,
      });
    } else {
      throw new Error("wrong credentials");
    }
  } catch (e) {
    res.status(400).send("Login failed " + e.message);
  }
});

module.exports = authRouter;
