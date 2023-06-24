const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { password, ...user } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const duplicateEmail = await User.findOne({ email: req.body.email });
    const duplicateUser = await User.findOne({ username: req.body.username });

    if (duplicateEmail) {
      res.status(400).json({
        status: "fail",
        message: `User with email : '${req.body.email}' already exists `,
      });
      return;
    } else if (duplicateUser) {
      res.status(400).json({
        status: "fail",
        message: `User with username : '${req.body.username}' already exists `,
      });
      return;
    } else {
      const newUser = await User.create({ ...user, password: hashed });
      res.status(201).json({
        status: "success",
        message: `User created successfully with name: ${newUser.username} and email: ${newUser.email}`,
        data: {
          username: newUser.username,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

const handleLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.json({
        message: "Wrong password",
      });
    }

    if (user && match) {
      const { password, ...otherDetails } = user._doc;

      const token = await jwt.sign(
        {
          username: user.username,
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "Login successful",
        data: { ...otherDetails },
        token,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { handleLogin, registerUser };
