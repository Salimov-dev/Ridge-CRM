import { Schema, model } from "mongoose"

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

export default model("Token", schema);
