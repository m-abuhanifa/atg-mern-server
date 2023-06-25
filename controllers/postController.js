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

module.exports = {
  createPost,
};
