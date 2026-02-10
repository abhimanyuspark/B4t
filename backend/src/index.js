import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import travelPlanRoutes from "./routes/travelPlan.routes.js";
import carerAvailabilityRoutes from "./routes/carerAvailability.routes.js";

import cors from "cors";
import corsOptions from "./config/cors.js";
import connectDB from "./config/mongoDB.js";
import dotenv from "dotenv";

import { app, server } from "./config/socket.js";

dotenv.config({ quiet: true });

// const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/travel-plans", travelPlanRoutes);
app.use("/api/carer-availabilities", carerAvailabilityRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});
