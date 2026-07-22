import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middleware/auth.js";
import * as trackingController from "./tracking.controller.js";

const router = Router();

router.post("/pageview", asyncHandler((req, res) => trackingController.pageview(req, res)));
router.get("/analytics", protect, asyncHandler((req, res) => trackingController.analytics(req, res)));

export default router;
