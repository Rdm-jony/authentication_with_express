import express from "express"
import dotenv from "dotenv"
import { userRoutes } from "../controller/user_controller"
import cookieParser from "cookie-parser"
const app =express()

app.use(express.json())
app.use(cookieParser())
app.use("/user",userRoutes)

dotenv.config()

export default app