import express from "express"; // web framework for Node.js
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfilePic,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfilePic);
router.get("/check", protectRoute, checkAuth);
export default router; // Export the router to be used in the main application file (index.js)
