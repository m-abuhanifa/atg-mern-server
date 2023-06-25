const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res
      .status(201)
      .json({ message: `New Post created `, data: newPost, success: true });
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res
      .status(200)
      .json({ message: `All Posts fetched`, data: posts, success: true });
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });

      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.json({ message: error, success: false });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  likeUnlikePost,
};
