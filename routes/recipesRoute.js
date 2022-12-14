const router = require("express").Router();
const { checkToken } = require("../checkToken");
const recipesController = require("../controllers/recipesController");

//ROUTE TO GET ALL RECIPES
router.route("/").get(recipesController.getAllRecipes);

//ROUTE TO GET A SINGLE RECIPE
router.route("/:id").get(recipesController.getSingleRecipe);

module.exports = router;
