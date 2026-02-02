import express from "express";
import {
  createBooking,
  acceptBooking,
  completeBooking,
  getMyBookings,
} from "../controllers/booking.controller.js";
import { requireCareseeker, requireCarer } from "../middleware/activeMode.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCareseeker, createBooking);
router.patch("/:id/accept", protectedRoute, requireCarer, acceptBooking);
router.patch("/:id/complete", protectedRoute, completeBooking);
router.get("/my", protectedRoute, getMyBookings);

export default router;
