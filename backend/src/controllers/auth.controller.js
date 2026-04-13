import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"; // Import the User model for database operations
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
//signup controller function to handle user registration
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Full name and email are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
      // generate jwt token here and send response
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const {email,password}=req.body;
  try{
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }
    generateToken(user._id,res);
    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilePic:user.profilePic
    })
  } catch(error){
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
 try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
 } catch(error){
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Server error" });
 }
};
