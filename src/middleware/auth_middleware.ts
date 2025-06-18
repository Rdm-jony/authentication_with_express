import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?:{id:{type:string},email:{type:string},role:{type:string}} // or whatever type you're assigning
    }
  }
}

export const authMiddleware = async (req: Request, res: Response,next:NextFunction): Promise<any> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        req.user=verifyToken(token)
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}