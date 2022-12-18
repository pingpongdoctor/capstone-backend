const router = require("express").Router();
const { checkToken } = require("../checkToken");
const userProfileController = require("../controllers/userProfileController");

router
  .route("/")
  .get(checkToken, userProfileController.getUserProfile)
  .put(checkToken, userProfileController.updateUserProfile);

router.route("/:id").get(userProfileController.getUserBasicInfor);
module.exports = router;
