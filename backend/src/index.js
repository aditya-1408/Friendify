import express from "express"; // web framework for Node.js
import dotenv from "dotenv"; // Load environment variables from .env file
import authRoute from "./routes/auth.route.js"; // Import the authentication routes
import messageRoute from "./routes/message.route.js"; // Import the message routes (assuming it's defined elsewhere)
import { connectDB } from "./lib/db.js"; // Import the function to connect to the database
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import cors from "cors"; // Middleware for enabling CORS (Cross-Origin Resource Sharing)

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cookieParser()); // Use cookie parser middleware to handle cookies
app.use(cors({ // Enable CORS for the frontend application
  origin: "http://localhost:5173", // Allow requests from this origin (frontend)
  credentials: true, // Allow cookies to be sent in cross-origin requests
}));

app.use("/api/auth", authRoute); // Use the authRoute for handling authentication-related routes
app.use("/api/messages", messageRoute); // Use the messageRoute for handling message-related routes (assuming it's defined elsewhere)

const PORT = process.env.PORT ?? 5001;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    try {
      await connectDB();
    } catch (error) {
      console.error(
        "MongoDB failed to connect; server will keep running:",
        error?.message ?? error,
      );
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
  }
};

startServer();
