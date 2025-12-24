import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import Gallery from "../models/Gallery.js";

const router = express.Router();

// ✅ Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "GHS_Gallery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// ✅ Get all gallery items
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "❌ Failed to fetch gallery images" });
  }
});

// ✅ Upload new image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "❌ No image uploaded" });

    const newImage = new Gallery({
      caption: req.body.caption || "",
      image: req.file.path,         // ✅ Cloudinary URL
      public_id: req.file.filename, // ✅ Cloudinary public ID
    });

    await newImage.save();
    res
      .status(201)
      .json({ message: "✅ Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "❌ Failed to upload image" });
  }
});

// ✅ Update image or caption
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem)
      return res.status(404).json({ message: "❌ Image not found" });

    // If new file uploaded → replace Cloudinary image
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(galleryItem.public_id);
      } catch (err) {
        console.warn("⚠️ Could not delete old Cloudinary image:", err.message);
      }
      galleryItem.image = req.file.path;
      galleryItem.public_id = req.file.filename;
    }

    // ✅ Update caption even if no new image uploaded
    if (req.body.caption !== undefined) {
      galleryItem.caption = req.body.caption;
    }

    await galleryItem.save();
    res
      .status(200)
      .json({ message: "✅ Image updated successfully", image: galleryItem });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "❌ Failed to update image" });
  }
});

// ✅ Delete image
router.delete("/:id", async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem)
      return res.status(404).json({ message: "❌ Image not found" });

    await cloudinary.uploader.destroy(galleryItem.public_id);
    await galleryItem.deleteOne();

    res.status(200).json({ message: "🗑 Image deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "❌ Failed to delete image" });
  }
});

export default router;
