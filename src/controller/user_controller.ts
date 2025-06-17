import express, { Request, Response } from "express"
import { User } from "../model/user_model"
import crypto from "crypto"
export const userRoutes = express.Router()

userRoutes.post("/signup", async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body
        const newUser = new User(body)
        const findUser = await User.findOne({ email: body.email })
        if (findUser) {
            return res.status(409).json({ success: false, message: "user already exist!" })

        }

        //passwod encrypt
        newUser.hashPassMethod()
        //create verify code
        newUser.varificationMethod()
        const user = await newUser.save()
        res.status(201).json({ success: false, message: "successfully create user and send verication code", user })
    } catch (error: any) {
        if (error.name === "ValidationError") {
            const errors: Record<string, string> = {};
            for (const key in error.errors) {
                errors[key] = error.errors[key].message;
            }
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
})

userRoutes.post("/signin", async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;


        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            return res.status(404).json({ success: false, message: "Invalid email or password" });
        }

        // ✅ Pass password to the instance method
        const isMatch = await findUser.passCompareMethod(password);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Invalid email or password" });
        }

        res.status(200).json({ success: true, message: "Successfully logged in", findUser });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

userRoutes.post("/verify", async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, verifyCode } = req.body
        const findUser = await User.findOne({ email: email })
        if (!findUser || !findUser.verificationCode || !findUser.verificationCodeExpires) {
            return res.status(400).json({ success: false, message: "Verification not initiated" });
        }

        if (findUser.verificationCode !== verifyCode) {
            return res.status(400).json({ success: false, message: "Invalid code" });
        }

        if (new Date() > findUser.verificationCodeExpires) {
            return res.status(400).json({ success: false, message: "Code expired" });

        }

        findUser.verificationCode = undefined;
        findUser.verificationCodeExpires = undefined;
        findUser.varifyed = true

        await findUser.save()
        return res.status(200).json({ success: true, message: "Verified" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Verification failed" });

    }
})

userRoutes.post("/resend-code/:email", async (req, res): Promise<any> => {
    try {
        const email = req.params.email
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found" });

        }

        if (findUser.varifyed) {
            return res.status(400).json({ success: false, message: "User already verified" });

        }

        findUser.varificationMethod()

        await findUser.save()

        return res.status(200).json({
            success: true,
            message: "Verification code resent",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong" });

    }
})
