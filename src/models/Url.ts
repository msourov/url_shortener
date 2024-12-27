import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    original_url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      unique: true,
    },
    click_count: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "url", // Explicitly set the collection name
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

export default mongoose.model("Url", UrlSchema);
