import { app } from "./app.js";
import dotenv from "dotenv";
import dbcall from "./db/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// This resolves the path to root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root folder
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("Loaded PORT from .env:", process.env.PORT);

const port = process.env.PORT || 8003;

dbcall()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });
   