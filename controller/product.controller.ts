import type { Request, Response, NextFunction } from "express";
import { Product } from "../model/product.model.js";
import type { ProductCreateDto, ProductUpdateDto } from "../dto/product.dto.js";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;
    if (!role || !["seller", "admin", "super_admin"].includes(role)) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    const body = req.body as ProductCreateDto;

    const seller_id = role === "seller" ? req.user!.id : body.seller_id ?? null;

    const product = await Product.create({
      name: body.name,
      description: body.description ?? null,
      price: body.price,
      stock: typeof body.stock === "number" ? body.stock : 0,
      images: body.images ?? [],
      category_id: typeof body.category_id === "number" ? body.category_id : null,
      brand: body.brand ?? null,
      seller_id: seller_id,
      is_active: typeof body.is_active === "boolean" ? body.is_active : true,
    });

    return res.status(201).json({ message: "Mahsulot yaratildi!", data: product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));
    if (!product) return res.status(404).json({ message: "Mahsulot topilmadi!" });
    return res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;
    if (!role || !["seller", "admin", "super_admin"].includes(role)) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    const { id } = req.params;
    const body = req.body as ProductUpdateDto;

    const product = await Product.findByPk(Number(id));
    if (!product) return res.status(404).json({ message: "Mahsulot topilmadi!" });

    if (role === "seller" && product.seller_id !== req.user!.id) {
      return res.status(403).json({ message: "Bu mahsulot sizga tegishli emas" });
    }

    if (typeof body.name !== "undefined") product.name = body.name;
    if (typeof body.description !== "undefined") product.description = body.description ?? null;
    if (typeof body.price !== "undefined") product.price = body.price;
    if (typeof body.stock !== "undefined") product.stock = body.stock;
    if (typeof body.images !== "undefined") product.images = body.images ?? [];
    if (typeof body.category_id !== "undefined") product.category_id = body.category_id ?? null;
    if (typeof body.brand !== "undefined") product.brand = body.brand ?? null;
    if (typeof body.is_active !== "undefined") product.is_active = body.is_active;

    if (typeof body.seller_id !== "undefined" && role !== "seller") {
      product.seller_id = body.seller_id ?? null;
    }

    await product.save();

    return res.status(200).json({ message: "Mahsulot yangilandi!", data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;
    if (!role || !["seller", "admin", "super_admin"].includes(role)) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    const { id } = req.params;
    const product = await Product.findByPk(Number(id));
    if (!product) return res.status(404).json({ message: "Mahsulot topilmadi!" });

    if (role === "seller" && product.seller_id !== req.user!.id) {
      return res.status(403).json({ message: "Bu mahsulot sizga tegishli emas" });
    }

    await product.destroy();
    return res.status(200).json({ message: "Mahsulot o'chirildi!" });
  } catch (error) {
    next(error);
  }
};

export const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;
    if (!role || !["seller", "admin", "super_admin"].includes(role)) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    const sellerId = role === "seller" ? req.user!.id : req.query.seller_id ? Number(req.query.seller_id) : req.user!.id;
    const products = await Product.findAll({ where: { seller_id: sellerId } });

    return res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};
