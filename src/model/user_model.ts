import { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import crypto from "crypto"
import { IUser, UserInstance, } from "../interface/user_interface";

const userSchema = new Schema<IUser, Model<IUser>, UserInstance>({
    firstName: { type: String, required: [true, "firstName is required"], minlength: [2, "firstName must have at least 2 charcter long"] },
    lastName: { type: String, required: [true, "lastName is required"], minlength: [2, "lastName must have at least 2 charcter long"] },
    email: {
        type: String, required: [true, "email is required"], unique: [true, "email already exists!"], validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    city: { type: String },
    password: { type: String, required: [true, "password is requires"] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    varifyed: { type: Boolean, default: false }
})




userSchema.method("passCompareMethod", async function (plainPass: string) {
    return await bcrypt.compare(plainPass, this.password)
})
userSchema.method("hashPassMethod", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.method("varificationMethod",  function () {
    this.verificationCode = crypto.randomBytes(3).toString("hex")
    this.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000)
})



export const User = model("User", userSchema)