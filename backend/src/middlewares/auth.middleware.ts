import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { getAccessToken } from "./utils/authUtils";
import { config } from "../config";
import { verifyToken } from "../modules/auth/utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Authorization invalid", 401);

  const accessToken = getAccessToken(authHeader);

  try {
    const decodedToken = verifyToken(accessToken, config.jwtSecret);
    req.user = {
      id: decodedToken.userId,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      throw new AppError("Token expired", 401);
    }
    throw new AppError("Authorization invalid", 401);
  }
};
