import type { Request, Response, NextFunction } from "express";
import { Order } from "../model/order.model.js";
import { OrderItem } from "../model/order_item.model.js";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import sequelize from "../config/db.js";
import type { OrderCreateDto, OrderStatusUpdateDto } from "../dto/order.dto.js";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user!.id;
    const body = req.body as OrderCreateDto;

    const cartItems = await Cart.findAll({ where: { user_id: userId }, include: [{ model: Product, as: "product" }], transaction: t });
    if (!cartItems.length) {
      await t.rollback();
      return res.status(400).json({ message: "Savat bo'sh" });
    }

    for (const item of cartItems) {
      const p = item.get("product") as Product | null;
      if (!p) {
        await t.rollback();
        return res.status(400).json({ message: "Mahsulot topilmadi" });
      }
      if (p.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Yetarli zaxira yo'q: ${p.name}` });
      }
    }

    let total = 0;
    for (const item of cartItems) {
      const p = item.get("product") as Product;
      total += Number(p.price) * item.quantity;
    }

    const order = await Order.create(
      {
        user_id: userId,
        total_price: total,
        payment_method: body.payment_method ?? null,
        shipping_address: body.shipping_address ?? null,
        note: body.note ?? null,
      },
      { transaction: t }
    );

    for (const item of cartItems) {
      const p = item.get("product") as Product;
      await OrderItem.create(
        {
          order_id: order.id,
          product_id: p.id,
          quantity: item.quantity,
          price: Number(p.price),
        },
        { transaction: t }
      );
      p.stock = p.stock - item.quantity;
      await p.save({ transaction: t });
    }

    await Cart.destroy({ where: { user_id: userId }, transaction: t });

    await t.commit();
    return res.status(201).json({ message: "Buyurtma yaratildi!", data: order });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const orders = await Order.findAll({ where: { user_id: userId }, order: [["created_at", "DESC"]] });
    return res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(Number(id), { include: [{ model: OrderItem, as: "items", include: [{ model: Product, as: "product" }] }] });
    if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });

    const role = req.user?.role;
    if (order.user_id !== req.user!.id && !(role && ["admin", "super_admin"].includes(role))) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    return res.status(200).json({ data: order });
  } catch (error) {
    next(error);
  }
};

export const listAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;
    if (!(role && ["admin", "super_admin"].includes(role))) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }
    const orders = await Order.findAll({ order: [["created_at", "DESC"]] });
    return res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;
    if (!(role && ["admin", "super_admin"].includes(role))) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    const { id } = req.params;
    const body = req.body as OrderStatusUpdateDto;

    const order = await Order.findByPk(Number(id));
    if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });

    if (typeof body.status !== "undefined") order.status = body.status;
    if (typeof body.payment_status !== "undefined") order.payment_status = body.payment_status;

    await order.save();
    return res.status(200).json({ message: "Buyurtma yangilandi", data: order });
  } catch (error) {
    next(error);
  }
};

export const cancelMyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const order = await Order.findByPk(Number(id));
    if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });
    if (order.user_id !== userId) return res.status(403).json({ message: "Ruxsat yo'q" });
    if (order.status !== "pending") return res.status(400).json({ message: "Faqat pending bekor qilinadi" });

    order.status = "cancelled" as const;
    await order.save();
    return res.status(200).json({ message: "Buyurtma bekor qilindi", data: order });
  } catch (error) {
    next(error);
  }
};
