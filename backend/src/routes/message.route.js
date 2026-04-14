import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
export default router; // Export the router to be used in the main application file (index.js)
