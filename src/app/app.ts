import express from "express"
import dotenv from "dotenv"
import { userRoutes } from "../controller/user_controller"
const app =express()

app.use(express.json())
app.use("/user",userRoutes)

dotenv.config()

export default app