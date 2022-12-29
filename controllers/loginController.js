require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

//LOGIN CALLBACK METHOD
exports.login = (req, res) => {
  //Access the users table
  knex("users")
    .then((data) => {
      if (req.body.email && req.body.password) {
        //USE FOR LOOP TO COMPARE THE HASHES WITH THE HEADER DATA AND SEARCH THE USER PROFILE INCASE THE HASHES MATCH THE POSTED PASSWORD
        for (let i = 0; i < data.length; i++) {
          //COMPARE THE PASSWORD WITH THE PASSWORD HASH
          bcrypt.compare(req.body.password, data[i].password, (err, result) => {
            if (result) {
              const foundUser = data[i];
              //IF USER IS FOUND AND THE EMAIL IS MATCHED
              if (foundUser && foundUser.email === req.body.email) {
                const {
                  id,
                  username,
                  gender,
                  age,
                  weight,
                  height,
                  updated_at,
                } = foundUser;

                //CREATE A JWT TOKEN
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
                //SEND JWT TOKEN TO THE FRONTEND
                res.status(200).send(jwtToken);
              }
            }
          });
        }
      } else {
        res.status(400).send("Please provide both email and password");
      }
    })
    .catch((err) => {
      res.send("Can not find the user");
    });
};
