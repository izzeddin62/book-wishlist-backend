import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyRequest extends Request {
    user: string | JwtPayload;
  }

export function authMiddleware(req: MyRequest, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT as string);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }

}