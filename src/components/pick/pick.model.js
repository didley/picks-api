import mongoose from "mongoose";

export const pickSchema = new mongoose.Schema(
  {
    url: { type: String, maxLength: 250, required: true, trim: true },
    nsfw: { type: Boolean, default: false, requited: true },
    userTitle: { type: String, maxLength: 60 },
    preview: {
      ogImageUrl: { type: String, maxLength: 250 },
      ogTitle: { type: String, maxLength: 200 },
      ogDescription: { type: String, maxLength: 200 },
      ogType: { type: String, maxLength: 120 },
      ogLocale: { type: String, maxLength: 10 },
    },
  },
  { timestamps: true }
);
