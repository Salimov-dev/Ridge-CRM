import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    bkgColor: String,
    txtColor: String,
    objectId: { type: Schema.Types.ObjectId, ref: "Object" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("DealStage", schema);