import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middleware/auth.js";
import { projectSchema } from "./project.validation.js";
import * as projectController from "./project.controller.js";

const router = Router();

router.get("/", asyncHandler((req, res) => projectController.list(req, res)));

router.get("/:slug", asyncHandler((req, res) => projectController.getBySlug(req, res)));

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    req.body = projectSchema.parse(req.body);
    await projectController.create(req, res);
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    req.body = projectSchema.partial().parse(req.body);
    await projectController.update(req, res);
  })
);

router.delete("/:id", protect, asyncHandler((req, res) => projectController.remove(req, res)));

export default router;
