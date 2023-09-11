import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    items: Array,
    isArchived: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Deal", schema);
