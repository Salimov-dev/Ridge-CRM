import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    isDone: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: Schema.Types.ObjectId, ref: "MeetingStatus" },
    meetingType: { type: Schema.Types.ObjectId, ref: "MeetingType" },
    date: String,
    time: String,
    comment: String,
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    objectId: { type: Schema.Types.ObjectId, ref: "Object" },
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
