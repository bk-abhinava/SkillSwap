const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

const loginUser = async(req,res) =>
{
    try{
        const {email,password} = req.body;

        if(!email|| !password)
        {
            return res.status(400).json(
                {
                    message : "Email and password are required",
                }
            );}

            const user= await User.findOne({email});
            if(!user)
            {
                return res.status(401).json(
                    {
                        message : "Invalid email or password",
                    }
                );
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if(!isPasswordCorrect)
            {
                return res.status(401).json(
                    {
                        message:"Invalid email or password",
                    }
                );
            }

            const token = jwt.sign(
                {
                userId:user._id,

                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"7d",
                }

            );

            res.status(200).json(
                {
                    message:"Login sucessfull",
                    token,
                    user:
                    {
                        id:user._id,
                        name:user.name,
                        email:user.email,
                    },
                }
            );
        } 
        catch(error){
            console.error("Login error:",error.message);
            res.status(500).json(
                {
                    message:"Server error",
                }
            );

        }
    
};

const getCurrentUser = async (req,res) =>
{
  try{
    const user = await User.findById(req.userId).select("-password");

    if(!user)
    {
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
    
    catch(error)
    {
      console.error("Get current user error:", error.message);
      res.status(500).json(
        {
          message:"Server error",
        }
      );
    }
  };


module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,       
};