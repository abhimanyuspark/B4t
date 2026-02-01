import mongoose from "mongoose";

const travelPlanSchema = new mongoose.Schema(
  {
    careseekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    origin: { type: String, required: true },
    destination: { type: String, required: true },

    travelDate: { type: Date, required: true },
    departureTime: String,
    flightNumber: String,

    servicesNeeded: [String],

    budget: Number,

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: ["OPEN", "MATCHED", "COMPLETED", "CANCELLED"],
      default: "OPEN",
    },
  },
  { timestamps: true },
);

export default mongoose.model("TravelPlan", travelPlanSchema);
