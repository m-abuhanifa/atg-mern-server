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

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
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

const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      user: req.body.userId,
      text: req.body.text,
    });

    await post.save();

    res
      .status(200)
      .json({ message: "The post has been commented", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPost,
  likeUnlikePost,
  deletePost,
  updatePost,
  commentPost,
};
