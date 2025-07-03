import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from  "dotenv";
dotenv.config();

const app = express();

// --- 1. CORE MIDDLEWARES ---
// These should come first to process every incoming request.

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded bodies (from forms)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from the 'public' folder
app.use(express.static("public"));

// Middleware to parse cookies
app.use(cookieParser());

// --- 2. IMPORT ROUTERS ---
// Keep all your imports together for clarity.

import Healthcheckrouter from "./routes/healthcheck.check.js";
import UserRouter from "./routes/user.routes.js";
import VideoRouter from "./routes/video.routes.js"; 
import likeRouter from "./routes/like.routes.js";

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is healthy" });
});

// --- 3. DEFINE API ROUTES ---
// Now that the body is parsed, the routes can use req.body safely.

app.use("/api/v1/healthcheck", Healthcheckrouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/videos", VideoRouter);
app.use("/api/v1/likes", likeRouter);

// --- 4. EXPORT APP ---
export { app };