import { Request, Response } from "express";
import z from "zod";
import { AppError } from "../../errors/AppError";
import { authService } from "./auth.service";
import { AuthController } from "./auth.interface";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError("Bad Request Error", 400);

  const email = parsed.data.email;
  const password = parsed.data.password;
  const accessToken = await authService.loginUser(email, password);

  res.status(200).json({
    success: true,
    accessToken,
  });
};

export const authController: AuthController = { loginUser };
