const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports = { handleLogin };
