import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { CustomErrorHandler } from "../error/custom-error-handler.js";

// Requestga user fieldini qo‘shish
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.AccessToken;

    if (!accessToken) {
      return next(CustomErrorHandler.UnAuthorized("Token topilmadi"));
    }

    const secret = process.env.ACCESS_SECRET_KEY;
    if (!secret) {
      return next(CustomErrorHandler.ServerError("ENV ACCESS_SECRET_KEY mavjud emas"));
    }

    jwt.verify(
      accessToken,
      secret,
      (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {

        if (err) {
          return next(CustomErrorHandler.Forbidden("Token noto'g'ri yoki muddati tugagan"));
        }

        if (!decoded) {
          return next(CustomErrorHandler.Forbidden("Token noto'g'ri"));
        }

        req.user = decoded; // endi decoded undefined emas → TS xato bermaydi
        next();
      }
    );

  } catch (error) {
    next(error);
  }
};
