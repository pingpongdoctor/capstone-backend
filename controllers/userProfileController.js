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
      .then((data) => {
        //CREATE A NEW JWT TOKEN BASED ON THE UPDATED USER PROFILE
        knex("users").then((data) => {
          const foundUser = data.find((user) => user.id === req.user.id);
          if (foundUser) {
            const { id, username, gender, age, weight, height, updated_at } =
              foundUser;
            const jwtToken = jwt.sign(
              {
                id: id,
                username: username,
                gender: gender,
                age: age,
                weight: weight,
                height: height,
                updated_at: updated_at,
              },
              JWT_SECRET
            );
            res.status(200).send(jwtToken);
          }
        });
      })
      .catch((error) => {
        res.status(500).send("Can not update your profile");
      });
  } else {
    res.status(400).send("Make sure You have already log in!");
  }
};
