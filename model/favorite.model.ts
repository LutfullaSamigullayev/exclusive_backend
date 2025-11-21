import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Favorite extends Model {
  declare id: number;
  declare user_id: number;
  declare product_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Favorite.init(
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
  },
  {
    tableName: "favorite",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
        name: "uniq_user_product_favorite",
      },
    ],
  }
);
