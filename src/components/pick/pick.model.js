import mongoose from "mongoose";
import validator from "validator";

export const pickSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      maxLength: 250,
      required: true,
      trim: true,
      validate: {
        validator: (val) => validator.isURL(val),
        message: "Please supply a valid Pick URL",
      },
    },
    nsfw: { type: Boolean, default: false, requited: true },
    userTitle: { type: String, maxLength: 60 },
    preview: {
      ogImageUrl: { type: String, maxLength: 250 },
      ogTitle: { type: String, maxLength: 200 },
      ogDescription: { type: String, maxLength: 200 },
      ogType: { type: String, maxLength: 120 },
      ogLocale: { type: String, maxLength: 10 },
    },
    comments: { type: String, maxLength: 200 },
  },
  { timestamps: true }
);
