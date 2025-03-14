import express from "express";
import { connectDB } from "./config/db.js";
import { router } from "./routes/product.routes.js";
import { NODE_ENV, PORT } from "./config/env.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Debug log for NODE_ENV
console.log("NODE_ENV in server.js:", NODE_ENV);

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Current directory:", __dirname);

const staticPath = path.join(__dirname, "..", "frontend", "dist");
const indexPath = path.join(staticPath, "index.html");

console.log("Static path:", staticPath);
console.log("Index path:", indexPath);

const app = express();

app.use(express.json());

// API routes
app.use("/api/products", router);

// Check if frontend build exists
if (String(NODE_ENV).trim() === "production") {
  console.log("Running in production mode");

  // Check if the build files exist
  if (fs.existsSync(indexPath)) {
    console.log("Frontend build found at:", indexPath);

    // Serve static files from the frontend build
    app.use(express.static(staticPath));

    // For any route that doesn't match an API route or static file, serve index.html
    app.get("*", (req, res) => {
      console.log("Serving index.html for route:", req.originalUrl);
      res.sendFile(indexPath);
    });
  } else {
    console.warn("WARNING: Frontend build not found at:", indexPath);
  }
} else {
  console.log("Running in development mode");
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.send("Server is ready");
});

// Start the server
app.listen(PORT || 5000, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT} as ${NODE_ENV}`);
});
