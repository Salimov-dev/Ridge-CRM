import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    curatorId: Array,
    gender: String,
    birthday: String,
    status: String,
    role: Array,
    name: {
      firstName: String,
      surName: String,
      lastName: String,
    },
    contacts: {
      phone: Number,
    },
    isActive: Boolean,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("User", schema);
