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

exports.updateUserProfile = (req, res) => {
  if (req.user) {
    knex("users")
      .where("id", req.user.id)
      .update(req.body)
      .then((data) => {})
      .catch((error) => {
        res.status(500).send("Can not update your profile");
      });
  } else {
    res.status(400).send("Make sure You have already log in!");
  }
};
