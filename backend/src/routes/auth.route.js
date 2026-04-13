import express from "express"; // web framework for Node.js
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router; // Export the router to be used in the main application file (index.js)
