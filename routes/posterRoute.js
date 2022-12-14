const router = require("express").Router();
const { checkToken } = require("../checkToken");
const posterController = require("../controllers/posterController");

//ROUTE TO GET THE PROFILE OF THE POSTER
router.route("/:posterId").get(posterController.getPosterProfile);
module.exports = router;
