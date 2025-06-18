import jwt from "jsonwebtoken"

export const generateToken = (payload:object):string => {
   return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });
}

export const verifyToken = (token: string): any => {
  const decoded= jwt.verify(token, process.env.JWT_SECRET!);
  return decoded
};
