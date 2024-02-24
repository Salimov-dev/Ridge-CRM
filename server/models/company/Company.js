import { DataTypes } from "sequelize";
import User from "../User.js";
import { sequelize } from "../../utils/postgre-conection.js";
import CompanyContact from "./CompanyContact.js";
import CompanyObject from "./CompanyObject.js";

const Company = sequelize.define(
  "Company",
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
    name: {
      type: DataTypes.STRING
    },
    profile: {
      type: DataTypes.STRING
    },
    objects: { type: DataTypes.JSONB, defaultValue: [] },
    contacts: { type: DataTypes.JSONB, defaultValue: [] },
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
    tableName: "companies"
  }
);

Company.hasMany(CompanyObject, {
  foreignKey: "companyId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Company.hasMany(CompanyContact, {
  foreignKey: "companyId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default Company;
