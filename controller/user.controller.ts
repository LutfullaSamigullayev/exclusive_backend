import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { sendOtp } from "../utils/send-otp.js";
import type { ResetPasswordDto, UserEmailDto, UserLoginDto, UserRegisterDto, VerifyUserDto } from "../dto/user.dto.js";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password } = req.body as UserRegisterDto;

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

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body as VerifyUserDto;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email topilmadi" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Kod noto'g'ri!" });
    }

    if (Date.now() > user.otp_time!) {
      return res.status(400).json({ message: "Kod muddati tugagan" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_time = null;
    await user.save();

    const payload = { id: user.id, email: user.email, role: user.role };
    const access = generateAccessToken(payload);
    const refresh = generateRefreshToken(payload);

    res.cookie("AccessToken", access, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie("RefreshToken", refresh, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 });

    return res.status(200).json({ message: "Tasdiqlandi!", token: access });

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as UserLoginDto;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Foydalanuvchi topilmadi!" });

    if (!user.verified) {
      return res.status(403).json({ message: "Email hali tasdiqlanmagan!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Parol noto'g'ri!" });

    const payload = { id: user.id, email: user.email, role: user.role };
    const access = generateAccessToken(payload);
    const refresh = generateRefreshToken(payload);

    res.cookie("AccessToken", access, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie("RefreshToken", refresh, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 });

    return res.status(200).json({ message: "Tizimga kirildi!", token: access });

  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as UserEmailDto;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email topilmadi!" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_time = Date.now() + 2 * 60 * 1000;

    user.otp = otp;
    user.otp_time = otp_time;
    await user.save();

    await sendOtp(email, otp);

    return res.status(200).json({ message: "Emailga kod yuborildi!" });

  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp, new_password } = req.body as ResetPasswordDto;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email topilmadi!" });

    if (user.otp !== otp) return res.status(400).json({ message: "Kod noto‘g‘ri!" });
    if (Date.now() > user.otp_time!) return res.status(400).json({ message: "Kod muddati tugagan!" });

    user.password = await bcrypt.hash(new_password, 12);
    user.otp = null;
    user.otp_time = null;

    await user.save();

    return res.status(200).json({ message: "Parol yangilandi!" });

  } catch (error) {
    next(error);
  }
};

