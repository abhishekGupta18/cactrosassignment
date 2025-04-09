require("dotenv").config();
const jwt = require("jsonwebtoken");
const Client = require("../models/client");

const clientAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("please login");
    }

    const decodedTokenData = await jwt.verify(
      token,
      process.env.jwt_token_secret
    );
    const { _id } = decodedTokenData;

    const client = await Client.findById(_id);
    if (!client) {
      throw new Error("user not found !!");
    } else {
      req.client = client;
      next();
    }
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
};

module.exports = clientAuth;
