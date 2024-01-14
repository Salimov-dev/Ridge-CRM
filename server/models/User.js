import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";

const User = sequelize.define(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    curatorId: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: null },
    gender: { type: DataTypes.STRING, defaultValue: null },
    birthday: { type: DataTypes.STRING, defaultValue: null },
    status: { type: DataTypes.STRING, defaultValue: null },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["CURATOR"],
    },
    firstName: { type: DataTypes.STRING, defaultValue: null },
    surName: { type: DataTypes.STRING, defaultValue: null },
    lastName: { type: DataTypes.STRING, defaultValue: null },
    phone: { type: DataTypes.INTEGER, defaultValue: null },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: null },
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
    tableName: "users", // Set your preferred table name
  }
);

export default User;
