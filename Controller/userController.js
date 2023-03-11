const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../Model/userModel");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please fill out all required fields." });
  } else {
    try {
      const user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          message:
            "Email has already been registered. Please sign in to continue",
        });
        return;
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = await User.create({
            email,
            password: hashedPassword,
          });

          if (newUser) {
            res.status(201).json({
              token: generateToken(newUser._id),
            });
          }
        } catch (e) {
          console.log(e);
          res.json({ message: e.message });
        }
      }
    } catch (e) {
      console.log(e);
      res.json({ message: e.message });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid Username/Password. Please try again.",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select("-password");

    res.json(user);
  } catch (e) {
    console.log(e);
    res.json({ errorMessage: e.message });
  }
};
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "365d", //Change value to appropriate amount for Production
  });
  return token;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
