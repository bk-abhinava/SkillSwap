const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

///signup
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        {
          message: "Email and password are required",
        }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(
        {
          message: "Invalid email or password",
        }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json(
        {
          message: "Invalid email or password",
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,

      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }

    );

    res.status(200).json(
      {
        message: "Login sucessfull",
        token,
        user:
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      }
    );
  }
  catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json(
      {
        message: "Server error",
      }
    );

  }

};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json(
        {
          message: "User not found",
        }
      );
    }
    res.status(200).json({
      user,
    });
  }

  catch (error) {
    console.error("Get current user error:", error.message);
    res.status(500).json(
      {
        message: "Server error",
      }
    );
  }
};


const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email ||
        payload.email_verified !== true) {
      return res.status(401).json({
        message: "Google account could not be verified",
      });
    }

    const googleId = payload.sub;
    const email = payload.email.toLowerCase();
    const name = payload.name || email.split("@")[0];

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        // Link the verified Google identity to this existing account.
        if (user.googleId && user.googleId !== googleId) {
          return res.status(409).json({
            message: "This email is linked to another Google account",
          });
        }

        user.googleId = googleId;
        await user.save();
      } else {
        user = await User.create({
          name,
          email,
          googleId,
          bio: "",
          skillsHave: [],
          skillsWant: [],
        });
      }
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google login error:", error.message);

    return res.status(401).json({
      message: "Google authentication failed",
    });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  googleLogin,
};