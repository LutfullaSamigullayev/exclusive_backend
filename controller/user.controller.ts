import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { sendOtp } from "../utils/send-otp.js";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Bu email band!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_time = Date.now() + 2 * 60 * 1000;

    const hashed = await bcrypt.hash(password, 12);

    await User.create({
      first_name,
      last_name,
      email,
      password: hashed,
      otp,
      otp_time,
      verified: false,
    });

    await sendOtp(email, otp);

    return res.status(201).json({ message: "Ro'yxatdan o'tdingiz! Emailga kod yuborildi." });

  } catch (error) {
    next(error);
  }
};
