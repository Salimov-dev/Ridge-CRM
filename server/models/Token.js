import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";

const Token = sequelize.define(
  "Token",
  {
    user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    tableName: "tokens"
  }
);

export default Token;
