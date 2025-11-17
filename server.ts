import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./router/user.router.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000

// router
app.use(userRouter)

app.listen(PORT, () => {
    console.log("Server is running at: ", PORT);
})

