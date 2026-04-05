import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  role: Role;
}

export const signToken = (
  payload: JWTPayload,
  secretKey: string,
  jwtExpiresIn: string,
) => {
  const signedToken = jwt.sign(payload, secretKey, {
    expiresIn: jwtExpiresIn as any,
  });
  return signedToken;
};
