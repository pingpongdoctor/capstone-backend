const router = require("express").Router();
const { checkToken } = require("../checkToken");
const recipesController = require("../controllers/recipesController");

//ROUTE TO GET ALL RECIPES
router
  .route("/")
  .get(recipesController.getAllRecipes)
  .post(checkToken, recipesController.addRecipe);

//ROUTE TO GET A SINGLE RECIPE
router
  .route("/:id")
  .get(recipesController.getSingleRecipe)
  .put(recipesController.likeRecipe);

//ROUTE TO GET COMMENTS OF A RECIPE
router
  .route("/:id/comments")
  .get(recipesController.getAllComments)
  .post(checkToken, recipesController.createComment);

//ROUTE TO DELETE A COMMENT
router
  .route("/:recipeId/comments/:commentId")
  .put(recipesController.likeComment)
  .delete(checkToken, recipesController.deleteComment);

module.exports = router;
