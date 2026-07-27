import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middleware/auth.js";
import * as adminController from "./admin.controller.js";

const router = Router();

router.get("/stats", protect, asyncHandler(adminController.stats));

export default router;
