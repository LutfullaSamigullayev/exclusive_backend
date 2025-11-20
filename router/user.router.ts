import { Router, type RequestHandler } from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  toAdmin,
  toSeller,
  refreshAccessToken,
} from "../controller/user.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";
import { superAdminChecker } from "../middleware/super_admin.chesker.middleware.js";
import { adminOrSuperAdminChecker } from "../middleware/admin-super_admin.chesker.middleware.js";
import { refreshTokenMiddleware } from "../middleware/refresh.token.middleware.js";

const userRouter = Router();

userRouter.post("/auth/register", registerUser as RequestHandler);
userRouter.post("/auth/verify", verifyUser as RequestHandler);
userRouter.post("/auth/login", loginUser as RequestHandler);
userRouter.post("/auth/forgot-password", forgotPassword as RequestHandler);
userRouter.post("/auth/reset-password", resetPassword as RequestHandler);

userRouter.post("/auth/logout", authorization as RequestHandler, logoutUser as RequestHandler);
userRouter.post(
  "/auth/refresh",
  refreshTokenMiddleware as RequestHandler,
  refreshAccessToken as RequestHandler
);

userRouter.post(
  "/users/to-admin",
  authorization as RequestHandler,
  superAdminChecker as RequestHandler,
  toAdmin as RequestHandler
);

userRouter.post(
  "/users/to-seller",
  authorization as RequestHandler,
  adminOrSuperAdminChecker as RequestHandler,
  toSeller as RequestHandler
);

export default userRouter;

