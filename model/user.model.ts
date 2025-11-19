import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class User extends Model {
  id!: number;
  first_name!: string;
  last_name?: string;
  email!: string;
  password!: string;
  role!: string;
  phone_number?: string;
  otp?: number | null;
  otp_time?: number | null;
  verified?: boolean;
  created_at!: Date;
  updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: true,
      defaultValue: 'customer'
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null
    },
    otp_time: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: true,
    sequelize: sequelize,
  }
);
