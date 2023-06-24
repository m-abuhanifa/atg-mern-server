const { handleLogin } = require("../controllers/authController");

const router = require("express").Router();

router.route("/login").post(handleLogin);

module.exports = router;
