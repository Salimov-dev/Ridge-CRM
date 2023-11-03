import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    curatorId: String,
    image: String,
    gender: String,
    birthday: String,
    status: String,
    role: String,
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
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    isActive: Boolean,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("User", schema);
