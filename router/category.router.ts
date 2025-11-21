import { Router, type RequestHandler } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controller/category.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";
import { adminOrSuperAdminChecker } from "../middleware/admin-super_admin.chesker.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategories as RequestHandler);
categoryRouter.get("/categories/:id", getCategoryById as RequestHandler);

categoryRouter.post(
  "/categories",
  authorization as RequestHandler,
  adminOrSuperAdminChecker as RequestHandler,
  createCategory as RequestHandler
);

categoryRouter.put(
  "/categories/:id",
  authorization as RequestHandler,
  adminOrSuperAdminChecker as RequestHandler,
  updateCategory as RequestHandler
);

categoryRouter.delete(
  "/categories/:id",
  authorization as RequestHandler,
  adminOrSuperAdminChecker as RequestHandler,
  deleteCategory as RequestHandler
);

export default categoryRouter;
