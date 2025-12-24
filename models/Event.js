import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true, // Cloudinary image URL
    },
    public_id: {
      type: String,
      required: true, // Cloudinary image public ID
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("Event", eventSchema);
