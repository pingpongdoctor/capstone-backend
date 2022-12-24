const router = require("express").Router();
const { checkToken } = require("../checkToken");
const recipesController = require("../controllers/recipesController");

//ROUTE TO GET ALL RECIPES
router
  .route("/")
  .get(recipesController.getAllRecipes)
  .post(checkToken, recipesController.addRecipe);

//ROUTE TO GET THE DATA OF RECIPE-USER
router.route("/recipes-users").get(recipesController.getRecipeUserData);

//ROUTE TO GET ALL SAVED RECIPES OF A USER
router
  .route("/saved-recipes")
  .get(checkToken, recipesController.getUserRecipes)
  .post(checkToken, recipesController.addRecipeToSavedList);

//ROUTE TO DELETE A RECIPE FROM THE SAVING LIST
router
  .route("/saved-recipes/:id")
  .delete(checkToken, recipesController.deleteRecipeFromSavedList);

//ROUTE TO GET A SINGLE RECIPE
router
  .route("/:id")
  .get(recipesController.getSingleRecipe)
  .put(recipesController.likeRecipe)
  .delete(checkToken, recipesController.deleteRecipe);

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

//ROUTE TO PUT A RECIPE
router.route("/:id/update").put(checkToken, recipesController.updateRecipe);

module.exports = router;
