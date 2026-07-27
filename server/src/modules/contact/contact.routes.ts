import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../utils/validate.js";
import { contactLimiter } from "../../middleware/rateLimit.js";
import { protect } from "../../middleware/auth.js";
import { contactSchema, contactStatusSchema } from "./contact.validation.js";
import * as contactController from "./contact.controller.js";

const router = Router();

// Public
router.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  asyncHandler(contactController.submit)
);

// Admin — order matters: /export before /:id
router.get("/export", protect, asyncHandler(contactController.exportCsv));
router.get("/", protect, asyncHandler(contactController.list));
router.get("/:id", protect, asyncHandler(contactController.getById));
router.patch("/:id", protect, validate(contactStatusSchema), asyncHandler(contactController.updateStatus));

export default router;
