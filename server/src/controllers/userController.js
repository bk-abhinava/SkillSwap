const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const { name, bio, skillsHave, skillsWant } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (skillsHave !== undefined) {
      user.skillsHave = skillsHave;
    }

    if (skillsWant !== undefined) {
      user.skillsWant = skillsWant;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        skillsHave: user.skillsHave,
        skillsWant: user.skillsWant,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  updateProfile,
  getUsers,
};