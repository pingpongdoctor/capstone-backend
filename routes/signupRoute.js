const router = require("express").Router();
const signupController = require("../controllers/signupController");

router.route("/").post(signupController.signupNewUser);

module.exports = router;
