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

exports.updateUserProfile = async (req, res) => {
  if (req.user) {
    try {
      //UPDATE USER
      await knex("users").where("id", req.user.id).update(req.body);
      //GET THE UPDATED USER
      const updatedUser = await knex("users").where("id", req.user.id);
      console.log(updatedUser);
      //CREATE A NEW JWT BASED ON NEW USER PROFILE
      if (updatedUser[0]) {
        const { id, username, gender, age, weight, height, updated_at } =
          updatedUser[0];
        const jwtToken = jwt.sign(
          {
            id,
            username,
            gender,
            age,
            weight,
            height,
            updated_at,
          },
          JWT_SECRET
        );
        console.log(jwtToken);
        res.status(200).send(jwtToken);
      }
    } catch (error) {
      res.status(500).send("Can not update your profile");
    }
  } else {
    res.status(400).send("Make sure You have already log in!");
  }
};

//CALLBACK METHOD TO GET THE USER NAME
exports.getUserBasicInfor = (req, res) => {
  knex("users")
    .where("id", req.params.id)
    .select("username")
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((error) => {
      res.status(500).send("Can not get the user basic information");
    });
};
