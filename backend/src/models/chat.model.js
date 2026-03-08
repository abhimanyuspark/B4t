import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Chat", chatSchema)