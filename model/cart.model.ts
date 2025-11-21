import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Cart extends Model {
  declare id: number;
  declare user_id: number;
  declare product_id: number;
  declare quantity: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Cart.init(
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
        name: "uniq_user_product_cart",
      },
    ],
  }
);
