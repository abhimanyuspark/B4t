import express from "express";
import {
  createAvailability,
  getMatchingCarers,
} from "../controllers/carerAvailability.controller.js";
import { requireCarer } from "../middleware/activeMode.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, requireCarer, createAvailability);
router.get("/match", protectedRoute, getMatchingCarers);

export default router;
