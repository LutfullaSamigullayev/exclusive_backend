import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./router/user.router.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const PORT = process.env.PORT || 3000

// router
app.use(userRouter)

app.listen(PORT, () => {
    console.log("Server is running at: ", PORT);
})

