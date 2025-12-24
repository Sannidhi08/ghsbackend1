import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Admin Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // 🔹 2. Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    // 🔹 3. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // 🔹 4. Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "1d" }
    );

    // 🔹 5. Send success response
    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

export default router;
