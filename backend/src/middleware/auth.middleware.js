import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for handling JWTs
import { User } from "../models/user.model.js"; // Import the User model for database operations

export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized, no token provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized, invalid token"})
        }
        const user  =await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"Unauthorized, user not found"})
        }
        req.user = user; // Attach the user object to the request for use in subsequent middleware or route handlers
        next(); // Call the next middleware or route handler

    } catch(error){
        console.error("Error in protectRoute middleware:", error);
        res.status(401).json({message:"Unauthorized, token verification failed"})
    }
}