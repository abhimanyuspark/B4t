import express from "express";
import {
  createAvailability,
  getMatchingCarers,
  getMyAvailabilities,
} from "../controllers/carerAvailability.controller.js";
import { requireCarer } from "../middleware/activeMode.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCarer, createAvailability);
router.get("/match/:planId", protectedRoute, getMatchingCarers);
router.get("/my", protectedRoute, requireCarer, getMyAvailabilities);

export default router;
