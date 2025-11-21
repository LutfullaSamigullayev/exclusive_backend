import type { Request, Response, NextFunction } from "express";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import type { CartAddDto, CartUpdateDto } from "../dto/cart.dto.js";

export const getMyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const items = await Cart.findAll({
      where: { user_id: userId },
      include: [{ model: Product, as: "product" }],
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ data: items });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const body = req.body as CartAddDto;
    const qty = typeof body.quantity === "number" && body.quantity > 0 ? body.quantity : 1;

    const product = await Product.findByPk(body.product_id);
    if (!product) return res.status(404).json({ message: "Mahsulot topilmadi!" });

    const [row, created] = await Cart.findOrCreate({
      where: { user_id: userId, product_id: body.product_id },
      defaults: { user_id: userId, product_id: body.product_id, quantity: qty },
    });

    if (!created) {
      row.quantity = row.quantity + qty;
      await row.save();
      return res.status(200).json({ message: "Savat yangilandi!", data: row });
    }

    return res.status(201).json({ message: "Savatga qo'shildi!", data: row });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { product_id } = req.params;
    const body = req.body as CartUpdateDto;

    if (typeof body.quantity !== "number") {
      return res.status(400).json({ message: "quantity raqam bo'lishi kerak" });
    }

    const row = await Cart.findOne({ where: { user_id: userId, product_id: Number(product_id) } });
    if (!row) return res.status(404).json({ message: "Savat elementi topilmadi!" });

    if (body.quantity <= 0) {
      await row.destroy();
      return res.status(200).json({ message: "Savatdan olib tashlandi" });
    }

    row.quantity = body.quantity;
    await row.save();
    return res.status(200).json({ message: "Savat yangilandi!", data: row });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { product_id } = req.params;

    const row = await Cart.findOne({ where: { user_id: userId, product_id: Number(product_id) } });
    if (!row) return res.status(404).json({ message: "Savat elementi topilmadi!" });

    await row.destroy();
    return res.status(200).json({ message: "Savatdan olib tashlandi" });
  } catch (error) {
    next(error);
  }
};

export const clearMyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    await Cart.destroy({ where: { user_id: userId } });
    return res.status(200).json({ message: "Savat tozalandi" });
  } catch (error) {
    next(error);
  }
};
