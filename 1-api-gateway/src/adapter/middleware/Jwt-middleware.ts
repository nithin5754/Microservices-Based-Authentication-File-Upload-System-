import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({
          success: false,
          error: "Authentication token missing or malformed",
        });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET not defined in environment");
      res.status(500).json({ success: false, error: "Internal server error" });
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      res.status(403).json({ success: false, error: "Invalid token payload" });
      return;
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", (err as Error).message);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};
