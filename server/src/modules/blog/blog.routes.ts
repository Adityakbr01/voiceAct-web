import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../utils/validate.js";
import { protect, requireRole } from "../../middleware/auth.js";
import { blogSchema } from "./blog.validation.js";
import * as blogController from "./blog.controller.js";

const router = Router();

// Public routes
router.get("/", asyncHandler(blogController.list));

// Admin routes - specific routes before :slug
router.get("/admin/all", protect, asyncHandler(blogController.listAdmin));

// Public slug route
router.get("/:slug", asyncHandler(blogController.getBySlug));

// Admin CRUD routes
router.post("/", protect, validate(blogSchema), asyncHandler(blogController.create));
router.put("/:id", protect, validate(blogSchema.partial()), asyncHandler(blogController.update));
router.delete("/:id", protect, requireRole("super_admin"), asyncHandler(blogController.remove));

export default router;
