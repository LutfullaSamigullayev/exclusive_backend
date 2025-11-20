import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class User extends Model {
  id!: number;
  first_name!: string;
  last_name?: string | null;
  email!: string;
  password!: string;
  role!: string;
  phone_number?: string | null;
  otp?: string | null;
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
      allowNull: true,
      defaultValue: null
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
      type: DataTypes.ENUM("customer", "seller", "admin", "super_admin"),
      allowNull: true,
      defaultValue: 'customer'
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    otp_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  },
  {
    tableName: "user",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);
