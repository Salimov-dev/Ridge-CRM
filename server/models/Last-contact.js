import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";

const LastContact = sequelize.define(
  "LastContact",
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
    date: { type: DataTypes.DATE },
    result: { type: DataTypes.STRING },
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
    tableName: "tasks",
  }
);

export default LastContact;

