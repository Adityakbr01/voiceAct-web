import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middleware/auth.js";
import * as trackingController from "./tracking.controller.js";

const router = Router();

// Public — called by client on every page navigation
router.post("/pageview", asyncHandler(trackingController.pageview));

// Admin
router.get("/analytics", protect, asyncHandler(trackingController.analytics));

export default router;
