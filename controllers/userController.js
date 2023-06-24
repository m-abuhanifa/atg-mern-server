const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
  res.send({ message: "Hello World!" });
};

const createUser = async (req, res) => {
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

module.exports = {
  getUsers,
  createUser,
};
