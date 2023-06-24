const { getUsers } = require("../controllers/userContoller");

const router = require("express").Router();

router.route("/").get(getUsers);

module.exports = router;
