import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    careseekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    travel: {
      date: Date,
      from: String,
      to: String,
      flightNumber: String,
    },

    requirements: {
      services: [String], // wheelchair, medical, language
      genderPreference: String,
      languages: [String],
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "REFUNDED"],
      default: "PENDING",
    },

    bookingStatus: {
      type: String,
      enum: [
        "OPEN", // waiting for carer requests
        "CARER_SELECTED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "OPEN",
    },

    selectedCarerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
