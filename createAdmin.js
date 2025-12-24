// backend/createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js"; // ✅ Make sure this path is correct

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "admin@gmail.com";
    const plainPassword = "admin123";  // ✅ You will login using this
    const role = "admin";

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();
    console.log("✅ Admin Created Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();
