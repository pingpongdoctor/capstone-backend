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
    //HASH THE PASSWORD
    bcrypt.hash(password, 10).then((hash) => {
      const postedObj = {
        ...req.body,
        password: hash,
      };
      knex("users").then((data) => {
        //CHECK THE DUPLICATE EMAIL
        const duplicateEmail = data.find((user) => user.email === email);
        if (duplicateEmail) {
          res.send("This email already exists");
        } else {
          //POST THE NEW USER TO THE DATABASE
          knex("users")
            .insert(postedObj)
            .then((data) => {
              res.status(201).send("New user profile is created");
            });
        }
      });
    });
  }
};
