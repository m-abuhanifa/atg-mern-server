const {
  handleLogin,
  registerUser,
  resetPassword,
} = require("../controllers/authController");

const router = require("express").Router();

router.route("/login").post(handleLogin);

router.route("/register").post(registerUser);

router.route("/reset").post(resetPassword);

module.exports = router;
