const router = require("express").Router();
const { checkToken } = require("../checkToken");
const macrosController = require("../controllers/macrosController");

router.route("/").post(checkToken, macrosController.postNewMacro);
module.exports = router;
