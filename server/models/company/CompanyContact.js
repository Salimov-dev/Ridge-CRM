import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/postgre-conection.js";
import User from "../User.js";

const CompanyContact = sequelize.define(
  "CompanyContact",
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
    companyId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    contact: { type: DataTypes.STRING },
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
    tableName: "companyContacts"
  }
);

export default CompanyContact;
