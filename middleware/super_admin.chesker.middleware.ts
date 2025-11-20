import type { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../error/custom-error-handler.js";

export const superAdminChecker = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role;

    if (role === "super_admin") {
      return next();
    }

    return next(CustomErrorHandler.UnAuthorized("Siz Super Admin emassiz"));

  } catch (error) {
    next(error);
  }
};
