import express from "express";
import {
  createTravelPlan,
  getMyTravelPlans,
  payment,
  verifyTravelPlanPayment,
} from "../controllers/travelPlan.controller.js";
import { requireCareseeker } from "../middleware/activeMode.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCareseeker, createTravelPlan);
router.post("/payment", protectedRoute, requireCareseeker, payment);
router.post("/verify-payment", protectedRoute, verifyTravelPlanPayment);
router.get("/my", protectedRoute, requireCareseeker, getMyTravelPlans);

export default router;
