import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/postgre-conection.js";
import User from "../User.js";

const ContactCompany = sequelize.define(
  "ContactCompany",
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
    contactId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    company: { type: DataTypes.STRING },
    isDefault: { type: DataTypes.BOOLEAN },
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
    tableName: "contactCompanies"
  }
);

export default ContactCompany;
