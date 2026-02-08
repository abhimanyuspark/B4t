import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    travelPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPlan",
      required: true,
    },

    carerAvailabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarerAvailability",
      required: true,
    },

    careseekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    carerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    status: {
      type: String,
      enum: ["PENDING_CARER_ACCEPTANCE", "CONFIRMED", "REJECTED", "COMPLETED"],
      default: "PENDING_CARER_ACCEPTANCE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
