import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./router/user.router.js"
import categoryRouter from "./router/category.router.js"
import productRouter from "./router/product.router.js"
import favoriteRouter from "./router/favorite.router.js"
import cartRouter from "./router/cart.router.js"
import orderRouter from "./router/order.router.js"
import sequelize from "./config/db.js"
import { User, Product, Category, Favorite, Cart, Order, OrderItem } from "./model/index.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const PORT = process.env.PORT || 3000

// router
app.use(userRouter)
app.use(categoryRouter)
app.use(productRouter)
app.use(favoriteRouter)
app.use(cartRouter)
app.use(orderRouter)

;(async () => {
    await sequelize.sync({ force: false })
    app.listen(PORT, () => {
        console.log("Server is running at: ", PORT);
    })
})().catch((error) => {
    console.log(error)
})
