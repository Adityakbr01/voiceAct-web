import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    visitorId: { type: String, required: true, index: true },
    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    visitCount: { type: Number, default: 1 },
    pagesViewed: { type: Number, default: 1 },
    landingPage: { type: String },
    exitPage: { type: String },
    sessionDuration: { type: Number, default: 0 },
    bounce: { type: Boolean, default: true },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    utmTerm: { type: String },
    utmContent: { type: String },
    referrer: { type: String },
    trafficSource: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
