import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middleware/auth.js";
import { uploadSchema } from "./upload.validation.js";
import * as uploadController from "./upload.controller.js";

const router = Router();

router.post(
  "/image",
  protect,
  asyncHandler(async (req, res) => {
    req.body = uploadSchema.parse(req.body);
    await uploadController.uploadImage(req, res);
  })
);

export default router;
