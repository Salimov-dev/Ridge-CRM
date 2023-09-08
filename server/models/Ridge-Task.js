import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    date: String,
    time: String,
    objectId: String,
    comment: String,
    isDone: Boolean,
    result: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("RidgeTask", schema);
