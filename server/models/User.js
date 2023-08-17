import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    curatorId: {
      type: String,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    name: {
      firstName: String,
      surName: String,
      lastName: String,
    },
    contacts: {
      phone: Number,
    },
    contract: {
      startDate: String,
      endDate: String,
      trialPeriod: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("User", schema);
