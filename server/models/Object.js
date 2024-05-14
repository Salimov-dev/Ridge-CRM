import { DataTypes } from "sequelize";
import { sequelize } from "../utils/postgre-conection.js";
import User from "./User.js";
import ContactCompany from "./contact/ContactCompany.js";
import CompanyContact from "./company/CompanyContact.js";

const Object = sequelize.define(
  "Object",
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
    status: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: "Статус не может быть пустым значением"
        }
      }
    },
    city: { type: DataTypes.STRING },
    district: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: "Район не может быть пустым значением"
        }
      }
    },
    metro: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    address: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: "Район не может быть пустым значением"
        }
      }
    },
    identifier: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    latitude: { type: DataTypes.DOUBLE },
    longitude: { type: DataTypes.DOUBLE },
    zoom: { type: DataTypes.INTEGER, defaultValue: 16 },
    companies: { type: DataTypes.JSONB, defaultValue: [] },
    contacts: { type: DataTypes.JSONB, defaultValue: [] },
    fullDescription: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    rentPrice: { type: DataTypes.DOUBLE, defaultValue: null, allowNull: true },
    securityDeposit: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    advanseDeposit: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    agentComission: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    rentSquare: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    rentalHolidays: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    indexingAnnual: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    rentTypes: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    currentRenters: { type: DataTypes.STRING },
    objectConditions: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    estateTypes: { type: DataTypes.STRING },
    tradeArea: { type: DataTypes.STRING },
    objectTypes: { type: DataTypes.STRING },
    loadingArea: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    premisesHeight: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    parkingQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true
    },
    electricityKw: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true
    },
    waterSuply: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    premisesFloor: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    cadastralNumber: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    objectProperties: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },

    cloudLink: { type: DataTypes.STRING, defaultValue: null, allowNull: true },

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
    tableName: "objects"
  }
);

Object.hasMany(CompanyContact, {
  foreignKey: "objectId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Object.hasMany(ContactCompany, {
  foreignKey: "objectId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default Object;
