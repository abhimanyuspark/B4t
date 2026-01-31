import express from "express";
import {
  register,
  login,
  logout,
  googleAuth,
  refreshToken,
  updateProfile,
  updateUserLocation,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);

router.post("/refresh", protectedRoute, refreshToken);
router.post("/profile", protectedRoute, updateProfile);
router.post("/update-location", protectedRoute, updateUserLocation);

router.patch("/switch-mode", protectedRoute, async (req, res) => {
  const { mode } = req.body;

  if (!["careSeeker", "carer"].includes(mode)) {
    return res.status(400).json({ message: "Invalid mode" });
  }

  req.user.activeMode = mode;
  await req.user.save();

  res.json({ activeMode: mode });
});

export default router;
