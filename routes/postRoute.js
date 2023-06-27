const {
  createPost,
  getAllPosts,
  likeUnlikePost,
  deletePost,
  updatePost,
  getPost,
  commentPost,
} = require("../controllers/postController");

const router = require("express").Router();

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id/like").put(likeUnlikePost);

router.route("/:id/comment").put(commentPost);

router.route("/:id").get(getPost).delete(deletePost).put(updatePost);

module.exports = router;
