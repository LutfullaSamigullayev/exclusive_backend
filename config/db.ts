import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    port: 5432,
    password: String(process.env.DB_PASSWORD as string),
    database: String(process.env.DB_DATABASE as string),
    logging: false,
})

sequelize.authenticate().then(()=> console.log("Connected to DB")).catch((error) => console.log(error.message))

sequelize.sync({force: false})

export default sequelize