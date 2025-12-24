import multer from "multer";
import path from "path";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

/* ----------------------------------------------------------
   🌩 Cloudinary Setup
---------------------------------------------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ----------------------------------------------------------
   🖼 Cloudinary Storage Configuration
---------------------------------------------------------- */
const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "school-gallery", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

/* ----------------------------------------------------------
   📁 Local Fallback (optional)
   - If Cloudinary fails or is disabled, images will still save locally
---------------------------------------------------------- */
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 'uploads' folder created at:", uploadPath);
}

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

/* ----------------------------------------------------------
   🚀 Final Export
   - If you want Cloudinary only → use `cloudStorage`
   - If you want local fallback → you can toggle below
---------------------------------------------------------- */

// ✅ Use Cloudinary (Recommended)
export const upload = multer({ storage: cloudStorage });

// 🧩 If you want to temporarily use local storage, comment above and uncomment below:
// export const upload = multer({ storage: localStorage });
