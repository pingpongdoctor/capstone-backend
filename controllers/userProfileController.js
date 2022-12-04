require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.getUserProfile = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.send("wrong token");
  }
};
