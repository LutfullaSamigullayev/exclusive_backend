import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Order extends Model {
  declare id: number;
  declare user_id: number;
  declare status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  declare total_price: number;
  declare payment_status: "unpaid" | "paid" | "refunded";
  declare payment_method: string | null;
  declare shipping_address: string | null;
  declare note: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    payment_status: {
      type: DataTypes.ENUM("unpaid", "paid", "refunded"),
      allowNull: false,
      defaultValue: "unpaid",
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "order",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);
