import express from "express";
import {
  register,
  login,
  logout,
  googleAuth,
  refreshToken,
  updateProfile,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);

router.post("/refresh", protectedRoute, refreshToken);
router.post("/profile", protectedRoute, updateProfile);

export default router;
