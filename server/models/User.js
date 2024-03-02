import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";

const User = sequelize.define(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    curatorId: { type: DataTypes.STRING, defaultValue: null },
    gender: { type: DataTypes.STRING, defaultValue: null },
    birthday: { type: DataTypes.STRING, defaultValue: null },
    status: { type: DataTypes.STRING, defaultValue: null },
    city: { type: DataTypes.STRING, defaultValue: null },
    color: { type: DataTypes.STRING, defaultValue: null },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["69gfoep3944jgjdso345003"] // роль по умолчанию "Куратор"
    },
    firstName: { type: DataTypes.STRING, defaultValue: null },
    surName: { type: DataTypes.STRING, defaultValue: null },
    lastName: { type: DataTypes.STRING, defaultValue: null },
    phone: { type: DataTypes.STRING, defaultValue: null },
    isEmailActived: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
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
    tableName: "users"
  }
);

export default User;
