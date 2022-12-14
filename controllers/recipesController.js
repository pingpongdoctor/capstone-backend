const knex = require("knex")(require("../knexfile"));

//CALLBACK METHOD TO GET ALL RECIPES
exports.getAllRecipes = (req, res) => {
  knex("recipes")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).send("Can not fetch the recipes data");
    });
};

//CALLBACK METHOD TO GET A SINGLE RECIPE
exports.getSingleRecipe = (req, res) => {
  knex("recipes")
    .where("id", req.params.id)
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((error) => {
      res.status(500).send("Can not get the recipe");
    });
};
