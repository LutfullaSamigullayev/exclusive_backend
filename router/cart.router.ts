import { Router, type RequestHandler } from "express";
import { addToCart, clearMyCart, getMyCart, removeCartItem, updateCartItem } from "../controller/cart.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";

const cartRouter = Router();

cartRouter.get("/cart", authorization as RequestHandler, getMyCart as RequestHandler);

cartRouter.post(
  "/cart",
  authorization as RequestHandler,
  addToCart as RequestHandler
);

cartRouter.put(
  "/cart/:product_id",
  authorization as RequestHandler,
  updateCartItem as RequestHandler
);

cartRouter.delete(
  "/cart/:product_id",
  authorization as RequestHandler,
  removeCartItem as RequestHandler
);

cartRouter.delete(
  "/cart",
  authorization as RequestHandler,
  clearMyCart as RequestHandler
);

export default cartRouter;
