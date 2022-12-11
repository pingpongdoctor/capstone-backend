const router = require("express").Router();
const { checkToken } = require("../checkToken");
const macrosController = require("../controllers/macrosController");

router
  .route("/")
  .post(checkToken, macrosController.postNewMacro)
  .get(checkToken, macrosController.getAllMacros);

router
  .route("/:id")
  .get(checkToken, macrosController.getOneMacro)
  .delete(checkToken, macrosController.deleteMacro)
  .put(checkToken, macrosController.updateMacro);

module.exports = router;
