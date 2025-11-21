import type { Request, Response, NextFunction } from "express";
import { Favorite } from "../model/favorite.model.js";
import { Product } from "../model/product.model.js";
import type { FavoriteAddParamDto } from "../dto/favorite.dto.js";

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { product_id } = req.body as FavoriteAddParamDto;

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Mahsulot topilmadi!" });

    const [fav, created] = await Favorite.findOrCreate({
      where: { user_id: userId, product_id },
      defaults: { user_id: userId, product_id },
    });

    if (!created) return res.status(200).json({ message: "Allaqachon sevimlilarda", data: fav });

    return res.status(201).json({ message: "Sevimlilarga qo'shildi!", data: fav });
  } catch (error) {
    next(error);
  }
};

export const getMyFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [{ model: Product, as: "product" }],
    });
    return res.status(200).json({ data: favorites });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { product_id } = req.params;

    const fav = await Favorite.findOne({ where: { user_id: userId, product_id: Number(product_id) } });
    if (!fav) return res.status(404).json({ message: "Sevimli topilmadi" });

    await fav.destroy();
    return res.status(200).json({ message: "Sevimlidan olib tashlandi" });
  } catch (error) {
    next(error);
  }
};
