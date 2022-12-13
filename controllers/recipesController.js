const knex = require("knex")(require("../knexfile"));

//CALLBACK METHOD TO GET ALL RECIPES
exports.getAllRecipes = (req, res) => {
  if (req.user) {
    knex("recipes")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).send("Can not fetch the recipes data");
      });
  } else {
    res.status(400).send("Can not find the user");
  }
};
