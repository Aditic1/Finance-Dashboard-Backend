import { Role } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

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

export const verifyToken = (
  accessToken: string,
  secretKey: string,
): JWTPayload => {
  const decoded = jwt.verify(accessToken, secretKey);
  if (
    typeof decoded === "object" &&
    decoded !== null &&
    "userId" in decoded &&
    "role" in decoded
  ) {
    return decoded as JWTPayload;
  }
  throw new Error("Invalid token payload structure");
};
