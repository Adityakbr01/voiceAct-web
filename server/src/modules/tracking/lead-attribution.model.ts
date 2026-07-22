import mongoose from "mongoose";

const leadAttributionSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, index: true },
    sessionId: { type: String, index: true },
    leadType: {
      type: String,
      enum: ["contact", "quote", "consultation", "newsletter"],
      required: true,
    },
    leadId: { type: mongoose.Schema.Types.ObjectId, required: true },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    utmTerm: { type: String },
    utmContent: { type: String },
    gclid: { type: String },
    fbclid: { type: String },
    msclkid: { type: String },
    ttclid: { type: String },
    liFatId: { type: String },
    campaignId: { type: String },
    adId: { type: String },
    creativeId: { type: String },
    keyword: { type: String },
    referrer: { type: String },
    landingPage: { type: String },
    trafficSource: { type: String },
    device: { type: String },
    browser: { type: String },
    os: { type: String },
    country: { type: String },
    city: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("LeadAttribution", leadAttributionSchema);
