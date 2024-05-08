import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";
import Object from "./Object.js";

const Presentation = sequelize.define(
  "Presentation",
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
      allowNull: false
    },
    objectId: {
      type: DataTypes.UUID,
      references: {
        model: Object,
        key: "_id"
      },
      defaultValue: null
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "654wqeg3469y9dfsd82dd334"
    },
    result: { type: DataTypes.STRING },
    cloudLink: { type: DataTypes.STRING },
    curatorComment: { type: DataTypes.STRING },

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
    tableName: "presentations"
  }
);

export default Presentation;
