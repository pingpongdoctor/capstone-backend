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
      const newObj = {
        ...req.body,
        password: hash,
      };
      //HASH THE EMAIL
      bcrypt.hash(email, 10).then((hash) => {
        const postedObj = {
          ...newObj,
          email: hash,
        };
        knex("users").then((data) => {
          //CHECK IF EMAIL IS DUPLICATE BY USING THE BCRYPT COMPARESYNC
          let isEmailDuplicate = false;
          for (let i = 0; i < data.length; i++) {
            isEmailDuplicate = bcrypt.compareSync(email, data[i].email);
          }
          if (isEmailDuplicate === false) {
            //CREATE A NEW USER ACCOUNT
            knex("users")
              .insert(postedObj)
              .then((data) => {
                res.status(201).send("New user profile is created");
              });
          } else {
            res.status(400).send("This email already exists");
          }
        });
      });
    });
  }
};
