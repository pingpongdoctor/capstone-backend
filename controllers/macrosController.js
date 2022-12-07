require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

exports.postNewMacro = (req, res) => {
  if (req.user) {
    const { user_id, macro_name, targeted_weight, activity, tdee, tdee_need } =
      req.body;
    console.log(
      user_id,
      macro_name,
      targeted_weight,
      activity,
      tdee,
      tdee_need
    );
    if (
      !user_id ||
      !macro_name ||
      !targeted_weight ||
      !activity ||
      !tdee ||
      !tdee_need
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
