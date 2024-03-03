import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";
import Object from "./Object.js";
import ContactCompany from "./contact/ContactCompany.js";

const LastContact = sequelize.define(
  "LastContact",
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
    date: { type: DataTypes.DATE },
    result: { type: DataTypes.STRING },
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
    tableName: "lastContacts"
  }
);

LastContact.hasMany(ContactCompany, {
  foreignKey: "lastContactId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default LastContact;
