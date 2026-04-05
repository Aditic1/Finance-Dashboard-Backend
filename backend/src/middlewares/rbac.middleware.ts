import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const authorizeRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole))
      throw new AppError("Forbidden error", 403);
    return next();
  };
};
