import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(backendRoot, "..");

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const frontendDistDir = path.join(repoRoot, "frontend", "dist");
const frontendIndexHtml = path.join(frontendDistDir, "index.html");
const hasBuiltFrontend = fs.existsSync(frontendIndexHtml);

console.log(
  `[frontend] index.html ${hasBuiltFrontend ? "found" : "missing"} at ${frontendIndexHtml}`,
);

if (hasBuiltFrontend) {
  app.use(express.static(frontendDistDir));

  // Serve SPA for non-API GET routes.
  app.get(/^\/((?!api).)*/, (req, res) => {
    res.sendFile(frontendIndexHtml);
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).send("API is running");
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
