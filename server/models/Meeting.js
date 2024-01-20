import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";

const Meeting = sequelize.define(
  "Meeting",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users", // Имя таблицы (модели) в базе данных
        key: "_id",
      },
      allowNull: false,
    },
    objectId: {
      type: DataTypes.UUID,
      references: {
        model: "objects", // Имя таблицы (модели) в базе данных
        key: "_id",
      },
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
    },
    city: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    latitude: { type: DataTypes.DOUBLE },
    longitude: { type: DataTypes.DOUBLE },
    zoom: { type: DataTypes.INTEGER, defaultValue: 16 },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    type: { type: DataTypes.STRING, defaultValue: null },
    date: { type: DataTypes.DATE },
    time: { type: DataTypes.DATE },
    comment: { type: DataTypes.STRING },
    result: { type: DataTypes.STRING, defaultValue: null },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "meetings",
  }
);

export default Meeting;
