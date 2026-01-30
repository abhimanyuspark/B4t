import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    // 👤 OWNER
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🧳 BASIC INFO
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    destination: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          index: "2dsphere",
        },
      },
    },

    // 📅 DATES
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // 👥 BUDDIES
    companionsNeeded: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    companions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ✈️ PREFERENCES
    preferences: {
      budget: {
        type: String,
        enum: ["low", "medium", "high"],
      },
      tripStyle: [
        {
          type: String,
          enum: [
            "backpacking",
            "luxury",
            "adventure",
            "relaxation",
            "workation",
          ],
        },
      ],
      interests: [String],
    },

    // 🔄 STATUS
    status: {
      type: String,
      enum: ["open", "full", "completed", "cancelled"],
      default: "open",
      index: true,
    },

    // 🛡 MODERATION
    isPrivate: {
      type: Boolean,
      default: false,
    },

    isReported: {
      type: Boolean,
      default: false,
    },

    // 🗑 SOFT DELETE
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

/* 🔍 INDEXES */
tripSchema.index({ "destination.coordinates": "2dsphere" });
tripSchema.index({ startDate: 1, endDate: 1 });
tripSchema.index({ status: 1 });

/* 🧮 VIRTUALS */
tripSchema.virtual("durationDays").get(function () {
  if (!this.startDate || !this.endDate) return null;
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
});

/* ⚠️ VALIDATION */
tripSchema.pre("save", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End date cannot be before start date"));
  }
  next();
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
