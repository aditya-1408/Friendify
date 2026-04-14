import express from "express";
import { protectRoute } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/user",protectRoute,getUserForSidebar)

export default router; // Export the router to be used in the main application file (index.js)