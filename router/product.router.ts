import { Router, type RequestHandler } from "express";
import { createProduct, deleteProduct, getMyProducts, getProductById, getProducts, updateProduct } from "../controller/product.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";

const productRouter = Router();

productRouter.get("/products", getProducts as RequestHandler);
productRouter.get("/products/:id", getProductById as RequestHandler);
productRouter.get("/my/products", authorization as RequestHandler, getMyProducts as RequestHandler);

productRouter.post(
  "/products",
  authorization as RequestHandler,
  createProduct as RequestHandler
);

productRouter.put(
  "/products/:id",
  authorization as RequestHandler,
  updateProduct as RequestHandler
);

productRouter.delete(
  "/products/:id",
  authorization as RequestHandler,
  deleteProduct as RequestHandler
);

export default productRouter;
