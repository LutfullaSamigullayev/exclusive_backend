import { Router, type RequestHandler } from "express";
import { registerUser } from "../controller/user.controller.js";

const userRouter = Router()

userRouter.get("/register", registerUser as RequestHandler)

export default userRouter

