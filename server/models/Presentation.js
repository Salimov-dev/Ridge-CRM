import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";

const Presentation = sequelize.define(
  "Presentation",
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
    status: { type: DataTypes.STRING },
    result: { type: DataTypes.STRING },
    cloudLink: { type: DataTypes.STRING },
    curatorComment: { type: DataTypes.STRING },

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
    tableName: "presentations",
  }
);

export default Presentation;
