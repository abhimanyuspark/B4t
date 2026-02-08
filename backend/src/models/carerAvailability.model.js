import mongoose from "mongoose";

const carerAvailabilitySchema = new mongoose.Schema(
  {
    carerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    origin: { type: String, required: true },
    destination: { type: String, required: true },

    availableDate: { type: Date, required: true },
    departureTime: String,
    flightNumber: String,

    servicesOffered: [String],

    status: {
      type: String,
      enum: ["ACTIVE", "BOOKED", "CANCELLED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("CarerAvailability", carerAvailabilitySchema);
