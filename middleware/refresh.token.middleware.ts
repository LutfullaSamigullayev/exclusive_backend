import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomErrorHandler } from "../error/custom-error-handler.js";

type RefreshPayload = jwt.JwtPayload & {
  id: number;
  email: string;
  role: string;
};

export const refreshTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.RefreshToken;

    if (!refreshToken) {
      return next(CustomErrorHandler.UnAuthorized("Token not found"));
    }

    const secret = process.env.REFRESH_SECRET_KEY;
    if (!secret) {
      return next(CustomErrorHandler.ServerError("ENV REFRESH_SECRET_KEY mavjud emas"));
    }

    jwt.verify(
      refreshToken,
      secret,
      (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
        if (err) {
          return next(CustomErrorHandler.Forbidden("Invalid token"));
        }

        if (!decoded || typeof decoded === "string") {
          return next(CustomErrorHandler.Forbidden("Invalid token"));
        }

        req.user = decoded as RefreshPayload;
        next();
      }
    );

  } catch (error) {
    next(error);
  }
};
