const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

exports.signupNewUser = (req, res) => {
  const { username, email, password, gender, age, weight, height } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    !gender ||
    !age ||
    !weight ||
    !height
  ) {
    res.status(400).send("Please post the correct object");
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      const newObj = {
        ...req.body,
        password: hash,
      };
      bcrypt.hash(email, 10).then((hash) => {
        const postedObj = {
          ...newObj,
          email: hash,
        };
        knex("users")
          .insert(postedObj)
          .then((data) => {
            res.status(201).send("New user profile is created");
          })
          .catch((error) => {
            res.status(500).send("Can not create a new user");
          });
      });
    });
  }
};
