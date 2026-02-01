import express from "express";
import {
  createTravelPlan,
  markTravelPlanPaid,
} from "../controllers/travelPlan.controller.js";
import { requireCareseeker } from "../middleware/activeMode.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCareseeker, createTravelPlan);
router.patch("/:id/pay", protectedRoute, requireCareseeker, markTravelPlanPaid);

export default router;
