import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { CustomErrorHandler } from "../error/custom-error-handler.js";

type AuthPayload = JwtPayload & {
  id: number;
  email: string;
  role: string;
};

// Requestga user fieldini qo‘shish
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
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

        if (!decoded || typeof decoded === "string") {
          return next(CustomErrorHandler.Forbidden("Token noto'g'ri"));
        }

        req.user = decoded as AuthPayload;
        next();
      }
    );

  } catch (error) {
    next(error);
  }
};
