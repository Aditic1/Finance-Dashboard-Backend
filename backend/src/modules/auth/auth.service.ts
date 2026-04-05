import { AppError } from "../../errors/AppError";
import { usersRepo } from "../users/users.repository";
import bcrpyt from "bcrypt";
import { JWTPayload, signToken } from "./utils/jwt";
import { config } from "../../config/env";

const login = async (email: string, rawPassword: string): Promise<string> => {
  const user = await usersRepo.findByEmail(email);
  if (!user) throw new AppError("Invalid Credentials", 401);

  const credentialsValidity = await bcrpyt.compare(rawPassword, user.password);
  if (!credentialsValidity) throw new AppError("Invalid Credentials", 401);

  const payload: JWTPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = signToken(payload, config.jwtSecret, config.jwtExpiresIn);
  return accessToken;
};
