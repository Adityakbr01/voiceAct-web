import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../utils/validate.js";
import { protect, requireRole } from "../../middleware/auth.js";
import { projectSchema } from "./project.validation.js";
import * as projectController from "./project.controller.js";

const router = Router();

// Public
router.get("/", asyncHandler(projectController.list));
router.get("/:slug", asyncHandler(projectController.getBySlug));

// Admin
router.post("/", protect, validate(projectSchema), asyncHandler(projectController.create));
router.put("/:id", protect, validate(projectSchema.partial()), asyncHandler(projectController.update));
router.delete("/:id", protect, requireRole("super_admin"), asyncHandler(projectController.remove));

export default router;
