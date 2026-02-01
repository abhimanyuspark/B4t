import express from "express";
import { requireCarer, requireCareseeker } from "../middleware/activeMode.js";
import {
  applyToBooking,
  acceptCarer,
  getCarerRequestsForBooking,
  getMyCarerRequests,
} from "../controllers/carerRequest.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCarer, applyToBooking);

router.patch("/:id/accept", protectedRoute, requireCareseeker, acceptCarer);

router.get(
  "/booking/:bookingId",
  protectedRoute,
  requireCareseeker,
  getCarerRequestsForBooking,
);

router.get("/my", protectedRoute, requireCarer, getMyCarerRequests);

export default router;
