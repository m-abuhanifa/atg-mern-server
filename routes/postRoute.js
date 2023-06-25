const { createPost } = require("../controllers/postController");

const router = require("express").Router();

router.route("/").post(createPost);

module.exports = router;
