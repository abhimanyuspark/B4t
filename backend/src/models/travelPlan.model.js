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
    languages: [String],
    gender: String,

    // payment
    totalPaid: {
      type: Number,
      required: true,
    },

    platformCommission: {
      type: Number,
      required: true,
    },

    carerPayout: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "REFUNDED"],
      default: "PENDING",
    },

    payoutStatus: {
      type: String,
      enum: ["HOLD", "RELEASED"],
      default: "HOLD",
    },

    isCarerSelected: {
      type: Boolean,
      default: false,
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
