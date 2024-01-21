import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";

const Task = sequelize.define(
  "Task",
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
    managerId: {
      type: DataTypes.UUID,
      references: {
        model: "users", // Имя таблицы (модели) в базе данных
        key: "_id",
      },
      defaultValue: null,
      allowNull: true,
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
    time: { type: DataTypes.DATE },
    comment: { type: DataTypes.STRING },
    result: { type: DataTypes.STRING, defaultValue: null },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    isCallTask: { type: DataTypes.BOOLEAN, defaultValue: false },
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

export default Task;
