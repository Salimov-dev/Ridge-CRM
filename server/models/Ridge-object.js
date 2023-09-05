import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    status: {
      type: Schema.Types.ObjectId,
      ref: "RidgeObjectStatus",
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact: {
      phone: Number,
      name: String,
    },
    description: {
      fullDescription: { type: String },
    },
    location: {
      city: { type: String, required: true },
      district:  { type: String, required: true },
      metro:  String,
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      zoom: { type: Number, required: true },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  }
);

export default model("RidgeObject", schema);
