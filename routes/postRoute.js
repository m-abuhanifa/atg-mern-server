const {
  createPost,
  getAllPosts,
  likeUnlikePost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const router = require("express").Router();

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id/like").put(likeUnlikePost);

router.route("/:id").delete(deletePost).put(updatePost);

module.exports = router;
