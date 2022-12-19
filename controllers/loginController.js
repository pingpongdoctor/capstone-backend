require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

//LOGIN CALLBACK METHOD
exports.login = (req, res) => {
  //Access the users table
  knex("users")
    .then((data) => {
      if (req.body.email && req.body.password) {
        const foundUser = data.find(
          (user) =>
            user.email === req.body.email && user.password === req.body.password
        );
        //Find user profile
        if (foundUser) {
          const { id, username, gender, age, weight, height, updated_at } =
            foundUser;
          //Create a JWT token
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
          //Response JWT token to the client
          res.status(200).send(jwtToken);
        } else {
          res.status(401).send("Not a valid user");
        }
      } else {
        res.status(400).send("Please provide both email and password");
      }
    })
    .catch((err) => {
      res.send("Can not find the user");
    });
};
