import { DataTypes } from "sequelize";
import dayjs from "dayjs";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";

const UserLicense = sequelize.define(
  "UserLicense",
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
    managers: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    observers: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    balance: { type: DataTypes.DECIMAL, defaultValue: 0 },
    dateStart: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    dateEnd: {
      type: DataTypes.DATE,
      defaultValue: () => dayjs().add(15, "day").toDate()
    },
    accountType: { type: DataTypes.STRING, defaultValue: "DEMO" },
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
    tableName: "userLicenses"
  }
);

export default UserLicense;
