import { Model } from "mongoose";

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    city: string,
    role: "user" | "admin",
    verificationCode: string | undefined,
    varifyed: boolean,
    verificationCodeExpires: Date | undefined
}


export interface UserInstance {
    passCompareMethod(plainPass: string): boolean,
    hashPassMethod(): void,
    varificationMethod(): void
}


