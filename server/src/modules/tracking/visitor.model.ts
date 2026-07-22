import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true, index: true },
    ip: { type: String },
    userAgent: { type: String },
    device: { type: String },
    browser: { type: String },
    os: { type: String },
    language: { type: String },
    timezone: { type: String },
    country: { type: String },
    city: { type: String },
    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
