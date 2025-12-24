import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "🚀 Nalyapadavu Backend is running successfully!",
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "❌ Route not found",
  });
});

// Only listen locally
const PORT = process.env.PORT || 5000;
if (process.env.VERCEL === undefined) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

// Export app for Vercel
export default app;
