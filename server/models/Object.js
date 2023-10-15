import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    status: String,
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact: {
      phone: Number,
      name: String,
      position: String,
      email: String,
    },
    description: {
      fullDescription: String,
    },
    commercialTerms: {
      rentPrice: String,
      priceForMetr: String,
      securityDeposit: String,
      advanseDeposit: String,
      rentSquare: Number,
      rentalHolidays: String,
      indexingAnnual: Number,
      rentTypes: String,
    },
    estateOptions: {
      currentRenters: String,
      objectConditions: String,
      estateTypes: String,
      objectTypes: String,
      loadingArea: String,
      premisesHeight: Number,
      parkingQuantity: Number,
      electricityKw: Number,
      waterSuply: String,
      premisesFloor: String,
      cadastralNumber: String,
      objectProperties: String,
    },
    location: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      metro: String,
      address: { type: String, required: true },
      identifier: String,
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
