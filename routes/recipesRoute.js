const router = require("express").Router();
const { checkToken } = require("../checkToken");
const recipesController = require("../controllers/recipesController");

//ROUTE TO GET ALL RECIPES
router.route("/").get(recipesController.getAllRecipes);

module.exports = router;
