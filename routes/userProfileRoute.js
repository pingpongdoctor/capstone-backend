const router = require("express").Router();
const { checkToken } = require("../checkToken");
const userProfileController = require("../controllers/userProfileController");

router.route("/").get(checkToken, userProfileController.getUserProfile);
module.exports = router;
