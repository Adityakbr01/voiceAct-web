import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../utils/validate.js";
import { protect, requireRole } from "../../middleware/auth.js";
import { serviceSchema, serviceReorderSchema } from "./service.validation.js";
import * as serviceController from "./service.controller.js";

const router = Router();

// Public
router.get("/", asyncHandler(serviceController.list));

// Admin — order matters: specifics before :slug
router.get("/admin/all", protect, asyncHandler(serviceController.listAdmin));
router.patch("/reorder", protect, validate(serviceReorderSchema), asyncHandler(serviceController.reorder));

// Public slug (after admin routes to avoid conflicts)
router.get("/:slug", asyncHandler(serviceController.getBySlug));

// Admin CRUD
router.post("/", protect, validate(serviceSchema), asyncHandler(serviceController.create));
router.put("/:id", protect, validate(serviceSchema.partial()), asyncHandler(serviceController.update));
router.delete("/:id", protect, requireRole("super_admin"), asyncHandler(serviceController.remove));

export default router;
