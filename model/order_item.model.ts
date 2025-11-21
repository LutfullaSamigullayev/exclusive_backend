import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class OrderItem extends Model {
  declare id: number;
  declare order_id: number;
  declare product_id: number;
  declare quantity: number;
  declare price: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_item",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);
