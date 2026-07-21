import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authLimiter } from "../../middleware/rateLimit.js";
import { protect } from "../../middleware/auth.js";
import { loginSchema } from "./auth.validation.js";
import * as authController from "./auth.controller.js";

const router = Router();

router.post(
  "/login",
  authLimiter,
  asyncHandler(async (req, res) => {
    req.body = loginSchema.parse(req.body);
    await authController.login(req, res);
  })
);

router.get(
  "/me",
  protect,
  asyncHandler((req, res) => authController.me(req, res))
);

export default router;
