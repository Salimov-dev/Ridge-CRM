import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    status: {
      type: Schema.Types.ObjectId,
      ref: "ObjectStatus",
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fromRidgeObject: String,
    contact: {
      phone: Number,
      name: String,
      position: String,
      email: String,
    },
    description: {
      fullDescription: { type: String },
    },
    commercialTerms: {
      rentPrice: Number,
      securityDeposit: Number,
      totalSquare: Number,
      rentSquare: Number,
      rentalHolidays: String,
      agentComission: Number,
      indexingAnnual: Number,
      rentTypes: String,
    },
    estateOptions: {
      currentRenters: { type: Schema.Types.ObjectId, ref: "CurrentRenter" },
      objectConditions: String,
      estateTypes: { type: Schema.Types.ObjectId, ref: "EstateType" },
      objectTypes: { type: Schema.Types.ObjectId, ref: "ObjectType" },
      loadingArea: String,
      premisesHeight: Number,
      parkingQuantity: Number,
      electricityKw: Number,
      waterSuply: String,
      premisesFloor: String,
      cadastralNumber: String,
    },
    location: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      metro: String,
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      zoom: { type: Number, required: true },
    },
    cloudLink: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  }
);

export default model("Object", schema);
