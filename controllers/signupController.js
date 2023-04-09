const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

exports.signupNewUser = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);
    //HASH THE EMAIL
    const hashedEmail = await bcrypt.hash(email, 10);
    //UPDATE THE POSTED SIGNUP USER PROFILE
    const newObj = {
      ...req.body,
      password: hashedPassword,
      email: hashedEmail,
    };
    //CHECK IF EMAIL IS DUPLICATE BY USING THE BCRYPT COMPARESYNC
    const usersData = await knex("users");
    let isEmailDuplicate = false;
    //USE FOR LOOP TO CHECK THE DUPLICATE OF EMAIL
    for (let i = 0; i < usersData.length; i++) {
      isEmailDuplicate = await bcrypt.compare(email, usersData[i].email);
      if (isEmailDuplicate === true) {
        //IF THE EMAIL IS DUPLICATE, SEND A MESSAGE TO ANNOUCE
        res.status(400).send("This email already exists");
        break;
      }
    }
    // //UPDATE A NEW USER PROFILE IF THERE IS NOT DUPLICATE
    if (isEmailDuplicate === false) {
      await knex("users").insert(newObj);
      res.status(201).send("New user profile is created");
    }
  }
};
