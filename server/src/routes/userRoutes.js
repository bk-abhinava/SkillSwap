const express = require("express");

const {
  updateProfile,
  getUsers,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/profile", protect, updateProfile);

router.get("/", protect, getUsers);

module.exports = router;