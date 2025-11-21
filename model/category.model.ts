import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Category extends Model {
  declare id: number;
  declare name: string;
  declare slug: string | null;
  declare description: string | null;
  declare parent_id: number | null;
  declare is_active: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Category.init(
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
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    parent_id: {
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
    tableName: "category",
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);
