import type { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model.js";

User.sync({ force: false });

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {

  } catch (error: any) {
    next(error);
  }
};
