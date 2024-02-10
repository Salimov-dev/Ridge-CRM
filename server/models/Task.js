import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";
import Object from "./Object.js";

const Task = sequelize.define(
  "Task",
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
    managerId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "_id"
      },
      defaultValue: null,
      allowNull: true
    },
    objectId: {
      type: DataTypes.UUID,
      references: {
        model: Object,
        key: "_id"
      },
      defaultValue: null,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    date: { type: DataTypes.DATE, defaultValue: null },
    time: { type: DataTypes.DATE, defaultValue: null },
    comment: { type: DataTypes.STRING, defaultValue: null },
    result: { type: DataTypes.STRING, defaultValue: null },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    isCallTask: { type: DataTypes.BOOLEAN, defaultValue: false },
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
    tableName: "tasks"
  }
);

export default Task;
