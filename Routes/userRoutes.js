const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
} = require("../Controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userprofile", getUserById);
module.exports = router;
