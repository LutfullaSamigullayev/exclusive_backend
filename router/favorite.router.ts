import { Router, type RequestHandler } from "express";
import { addFavorite, getMyFavorites, removeFavorite } from "../controller/favorite.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";

const favoriteRouter = Router();

favoriteRouter.get(
  "/favorites",
  authorization as RequestHandler,
  getMyFavorites as RequestHandler
);

favoriteRouter.post(
  "/favorites",
  authorization as RequestHandler,
  addFavorite as RequestHandler
);

favoriteRouter.delete(
  "/favorites/:product_id",
  authorization as RequestHandler,
  removeFavorite as RequestHandler
);

export default favoriteRouter;
