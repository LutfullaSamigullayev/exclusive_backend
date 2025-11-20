import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class User extends Model {
  declare id: number;
  declare first_name: string;
  declare last_name: string | null;
  declare email: string;
  declare password: string;
  declare role: string;
  declare phone_number: string | null;
  declare otp: string | null;
  declare otp_time: number | null;
  declare verified: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
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
