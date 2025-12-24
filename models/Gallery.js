import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    public_id: { type: String, required: true }, // Cloudinary Public ID
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
