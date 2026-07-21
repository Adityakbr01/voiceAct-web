import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { contactLimiter } from "../../middleware/rateLimit.js";
import { protect } from "../../middleware/auth.js";
import { contactSchema } from "./contact.validation.js";
import * as contactController from "./contact.controller.js";

const router = Router();

router.post(
  "/",
  contactLimiter,
  asyncHandler(async (req, res) => {
    req.body = contactSchema.parse(req.body);
    await contactController.submit(req, res);
  })
);

router.get(
  "/",
  protect,
  asyncHandler((req, res) => contactController.list(req, res))
);

router.patch(
  "/:id",
  protect,
  asyncHandler((req, res) => contactController.updateStatus(req, res))
);

export default router;
