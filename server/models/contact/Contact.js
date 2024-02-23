import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/postgre-conection.js";
import User from "../User.js";
import ContactPhone from "./ContactPhone.js";
import ContactEmail from "./ContactEmail.js";
import ContactCompany from "./ContactCompany.js";
import ContactObject from "./ContactObject.js";

const Contact = sequelize.define(
  "Contact",
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
    name: { type: DataTypes.STRING },
    position: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING, defaultValue: null },
    emails: { type: DataTypes.JSONB, defaultValue: [] },
    companies: { type: DataTypes.JSONB, defaultValue: [] },
    phones: { type: DataTypes.JSONB, defaultValue: [] },
    objects: { type: DataTypes.JSONB, defaultValue: [] },
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
    tableName: "contacts"
  }
);

Contact.hasMany(ContactPhone, {
  foreignKey: "contactId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Contact.hasMany(ContactEmail, {
  foreignKey: "contactId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Contact.hasMany(ContactCompany, {
  foreignKey: "contactId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Contact.hasMany(ContactObject, {
  foreignKey: "contactId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default Contact;
