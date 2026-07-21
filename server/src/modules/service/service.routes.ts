import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middleware/auth.js";
import { serviceSchema } from "./service.validation.js";
import * as serviceController from "./service.controller.js";

const router = Router();

router.get("/", asyncHandler((req, res) => serviceController.list(req, res)));

router.get("/:slug", asyncHandler((req, res) => serviceController.getBySlug(req, res)));

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    req.body = serviceSchema.parse(req.body);
    await serviceController.create(req, res);
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    req.body = serviceSchema.partial().parse(req.body);
    await serviceController.update(req, res);
  })
);

router.delete("/:id", protect, asyncHandler((req, res) => serviceController.remove(req, res)));

export default router;
