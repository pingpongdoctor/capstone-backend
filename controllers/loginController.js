require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

//FUNCTION TO COMPARE POSTED EMAIL, PASSWORD AND THE HASHED EMAIL AND PASSWORD IN DATABASES
async function bcryptCompare(postedValue, value) {
  const result = await bcrypt.compare(postedValue, value);
  return result;
}

//LOGIN CALLBACK METHOD
exports.login = async (req, res) => {
  try {
    //ACCESS USER TABLE
    const data = await knex("users");
    //USE FOR LOOP TO COMPARE THE HASHES WITH THE HEADER DATA AND SEARCH THE USER PROFILE INCASE THE HASHES MATCH THE POSTED PASSWORD

    for (let i = 0; i < data.length; i++) {
      //COMPARE THE PASSWORD WITH THE PASSWORD HASH
      const comparePasswordResult = await bcryptCompare(
        req.body.password,
        data[i].password
      );

      //COMPARE THE EMAIL WITH THE EMAIL HASH
      const compareEmailResult = await bcryptCompare(
        req.body.email,
        data[i].email
      );

      //FIND THE USER
      const foundUser = data[i];

      //IF USER IS FOUND AND THE EMAIL IS MATCHED
      if (comparePasswordResult && compareEmailResult && foundUser) {
        const { id, username, gender, age, weight, height, updated_at } =
          foundUser;

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
  } catch (e) {
    res.status(400).send("Please provide correct email and password");
  }
};
