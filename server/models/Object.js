import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";

const Object = sequelize.define(
  "Object",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "_id"
      },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    status: {
      type: DataTypes.STRING
    },

    city: { type: DataTypes.STRING },
    district: { type: DataTypes.STRING },
    metro: { type: DataTypes.STRING, defaultValue: null },
    address: { type: DataTypes.STRING },
    identifier: { type: DataTypes.STRING, defaultValue: null },
    latitude: { type: DataTypes.DOUBLE },
    longitude: { type: DataTypes.DOUBLE },
    zoom: { type: DataTypes.INTEGER, defaultValue: 16 },

    contact: { type: DataTypes.STRING, defaultValue: null },
    fullDescription: { type: DataTypes.STRING, defaultValue: null },
    rentPrice: { type: DataTypes.DECIMAL, defaultValue: null },
    securityDeposit: { type: DataTypes.DECIMAL, defaultValue: null },
    advanseDeposit: { type: DataTypes.DECIMAL, defaultValue: null },
    agentComission: { type: DataTypes.INTEGER, defaultValue: null },
    rentSquare: { type: DataTypes.INTEGER, defaultValue: null },
    rentalHolidays: { type: DataTypes.INTEGER, defaultValue: null },
    indexingAnnual: { type: DataTypes.INTEGER, defaultValue: null },
    rentTypes: { type: DataTypes.STRING, defaultValue: null },

    currentRenters: { type: DataTypes.STRING },
    objectConditions: { type: DataTypes.STRING, defaultValue: null },
    estateTypes: { type: DataTypes.STRING },
    tradeArea: { type: DataTypes.STRING },
    objectTypes: { type: DataTypes.STRING },
    loadingArea: { type: DataTypes.STRING, defaultValue: null },
    premisesHeight: { type: DataTypes.DOUBLE, defaultValue: null },
    parkingQuantity: { type: DataTypes.INTEGER, defaultValue: null },
    electricityKw: { type: DataTypes.INTEGER, defaultValue: null },
    waterSuply: { type: DataTypes.STRING, defaultValue: null },
    premisesFloor: { type: DataTypes.STRING, defaultValue: null },
    cadastralNumber: { type: DataTypes.STRING, defaultValue: null },
    objectProperties: { type: DataTypes.STRING, defaultValue: null },

    cloudLink: { type: DataTypes.STRING, defaultValue: null },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    tableName: "objects"
  }
);

export default Object;
