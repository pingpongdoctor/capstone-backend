require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

exports.postNewMacro = (req, res) => {
  if (req.user) {
    const {
      user_id,
      macro_name,
      targeted_weight,
      activity,
      tdee,
      tdee_need,
      protein_ratio,
      fat_ratio,
      carb_ratio,
    } = req.body;
    if (
      !user_id ||
      !macro_name ||
      !targeted_weight ||
      !activity ||
      !tdee ||
      !tdee_need ||
      !protein_ratio ||
      !carb_ratio ||
      !fat_ratio
    ) {
      res.status(201).send("Please post a correct macro");
    } else {
      knex("macros")
        .insert(req.body)
        .then((data) => {
          res.status(201).send("New macro has been posted");
        });
    }
  } else {
    res.status(400).send("Can not find the user profile");
  }
};
