import { Router, type RequestHandler } from "express";
import { createOrder, getMyOrders, getOrderById, listAllOrders, updateOrderStatus, cancelMyOrder } from "../controller/order.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";
import { adminOrSuperAdminChecker } from "../middleware/admin-super_admin.chesker.middleware.js";

const orderRouter = Router();

orderRouter.post(
  "/orders",
  authorization as RequestHandler,
  createOrder as RequestHandler
);

orderRouter.get(
  "/orders",
  authorization as RequestHandler,
  getMyOrders as RequestHandler
);

orderRouter.get(
  "/orders/:id",
  authorization as RequestHandler,
  getOrderById as RequestHandler
);

orderRouter.get(
  "/admin/orders",
  authorization as RequestHandler,
  adminOrSuperAdminChecker as RequestHandler,
  listAllOrders as RequestHandler
);

orderRouter.patch(
  "/orders/:id/status",
  authorization as RequestHandler,
  adminOrSuperAdminChecker as RequestHandler,
  updateOrderStatus as RequestHandler
);

orderRouter.post(
  "/orders/:id/cancel",
  authorization as RequestHandler,
  cancelMyOrder as RequestHandler
);

export default orderRouter;
