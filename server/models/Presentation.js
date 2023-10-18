import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    objectId: String,
    result: String,
    status: String,
    cloudLink: String,
    curatorComment: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Presentation", schema);
