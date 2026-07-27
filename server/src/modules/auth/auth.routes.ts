import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../utils/validate.js";
import { authLimiter } from "../../middleware/rateLimit.js";
import { protect } from "../../middleware/auth.js";
import { loginSchema } from "./auth.validation.js";
import * as authController from "./auth.controller.js";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema), asyncHandler(authController.login));
router.post("/logout", protect, asyncHandler(authController.logout));
router.get("/me", protect, asyncHandler(authController.me));

export default router;
