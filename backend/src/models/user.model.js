import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      // lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    oauthId: {
      type: String,
      index: true,
      sparse: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 300,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },

    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    profilePicture: {
      type: String,
    },

    location: {
      city: String,
      country: String,

      geo: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number], // [lng, lat]
        },
      },
    },

    hasLocation: {
      type: Boolean,
      default: false,
    },

    travelPreferences: {
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

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// /* 🔍 INDEXES */
userSchema.index({ "location.geo": "2dsphere" });

// /* 🧮 VIRTUALS */
// userSchema.virtual("age").get(function () {
//   if (!this.dateOfBirth) return null;
//   return Math.floor((Date.now() - this.dateOfBirth.getTime()) / 31557600000);
// });

// /* 🔐 SAFE JSON OUTPUT */
// userSchema.methods.toSafeObject = function () {
//   const obj = this.toObject({ virtuals: true });
//   delete obj.password;
//   return obj;
// };

const User = mongoose.model("User", userSchema);

export default User;
