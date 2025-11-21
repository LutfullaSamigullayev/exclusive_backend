import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Product extends Model {
  declare id: number;
  declare name: string;
  declare description: string | null;
  declare price: number;
  declare stock: number;
  declare images: string[] | null;
  declare category_id: number | null;
  declare brand: string | null;
  declare seller_id: number | null;
  declare is_active: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "product",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);
