import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    isDone: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: String,
    meetingType: String,
    date: String,
    time: String,
    comment: String,
    objectId: String,
    result: String,
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    location: {
      city: String,
      address: String,
      latitude: Number,
      longitude: Number,
      zoom: Number,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Meeting", schema);
