import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    password: {
      type: String,
      default: null
    },

    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local"
    },

    oauthId: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
