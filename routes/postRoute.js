const {
  createPost,
  getAllPosts,
  likeUnlikePost,
} = require("../controllers/postController");

const router = require("express").Router();

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id/like").put(likeUnlikePost);

module.exports = router;
