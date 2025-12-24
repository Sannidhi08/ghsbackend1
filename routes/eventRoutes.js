import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import Event from "../models/Event.js";

const router = express.Router();

/* ================================
   ✅ Configure Cloudinary Storage
   ================================ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "GHS_Events", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const upload = multer({ storage });

/* ================================
   ✅ GET → Fetch All Events
   ================================ */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

/* ================================
   ✅ POST → Add New Event
   ================================ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path,        // ✅ Cloudinary URL
      public_id: req.file.filename // ✅ Cloudinary Public ID
    });

    await newEvent.save();
    res.status(201).json({
      message: "✅ Event added successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
});

/* ================================
   ✅ PUT → Update Event (DB + Cloudinary)
   ================================ */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🖼 If user uploaded a new image, replace it on Cloudinary
    if (req.file) {
      // Delete old image from Cloudinary (if exists)
      if (event.public_id) {
        await cloudinary.uploader.destroy(event.public_id);
      }

      // Update with new Cloudinary image info
      event.image = req.file.path;       // ✅ Cloudinary URL
      event.public_id = req.file.filename; // ✅ Cloudinary Public ID
    }

    // 📝 Update text fields
    if (req.body.title) event.title = req.body.title;
    if (req.body.description) event.description = req.body.description;

    await event.save();

    res.status(200).json({
      message: "✅ Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "❌ Failed to update event", error: error.message });
  }
});

/* ================================
   ✅ DELETE → Delete Event (DB + Cloudinary)
   ================================ */
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🧹 Delete image from Cloudinary
    if (event.public_id) {
      await cloudinary.uploader.destroy(event.public_id);
    }

    // 🧹 Delete from MongoDB
    await event.deleteOne();

    res.status(200).json({ message: "🗑 Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;
