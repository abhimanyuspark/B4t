import express from "express";
import { requireCarer, requireCareseeker } from "../middleware/activeMode.js";
import {
  createBooking,
  markPaymentDone,
  completeBooking,
  getBookingById,
  getOpenBookings,
  getMyBookings,
} from "../controllers/booking.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCareseeker, createBooking);

router.patch("/:id/pay", protectedRoute, requireCareseeker, markPaymentDone);

router.patch(
  "/:id/complete",
  protectedRoute,
  requireCareseeker,
  completeBooking,
);

router.get("/my", protectedRoute, requireCareseeker, getMyBookings);
router.get("/open", protectedRoute, requireCarer, getOpenBookings);
router.get("/:id", protectedRoute, getBookingById);

export default router;
