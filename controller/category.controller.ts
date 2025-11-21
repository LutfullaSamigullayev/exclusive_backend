import type { Request, Response, NextFunction } from "express";
import { Category } from "../model/category.model.js";
import type { CategoryCreateDto, CategoryUpdateDto } from "../dto/category.dto.js";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, description, parent_id, is_active } = req.body as CategoryCreateDto;

    const category = await Category.create({
      name,
      slug: slug ?? null,
      description: description ?? null,
      parent_id: parent_id ?? null,
      is_active: typeof is_active === "boolean" ? is_active : true,
    });

    return res.status(201).json({ message: "Kategoriya yaratildi!", data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(Number(id));

    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi!" });

    return res.status(200).json({ data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body as CategoryUpdateDto;

    const category = await Category.findByPk(Number(id));
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi!" });

    if (typeof body.name !== "undefined") category.name = body.name;
    if (typeof body.slug !== "undefined") category.slug = body.slug ?? null;
    if (typeof body.description !== "undefined") category.description = body.description ?? null;
    if (typeof body.parent_id !== "undefined") category.parent_id = body.parent_id ?? null;
    if (typeof body.is_active !== "undefined") category.is_active = body.is_active;

    await category.save();

    return res.status(200).json({ message: "Kategoriya yangilandi!", data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(Number(id));

    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi!" });

    await category.destroy();
    return res.status(200).json({ message: "Kategoriya o'chirildi!" });
  } catch (error) {
    next(error);
  }
};
