import type { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../error/custom-error-handler.js";

export const adminOrSuperAdminChecker = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;

    if (role && ["admin", "super_admin"].includes(role)) {
      return next();
    }

    return next(CustomErrorHandler.UnAuthorized("Siz Admin emassiz"));

  } catch (error) {
    next(error);
  }
};
