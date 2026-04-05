import { Request, Response } from "express";

export interface AuthService {
  loginUser(email: string, rawPassword: string): Promise<string>;
}

export interface AuthController {
  loginUser(req: Request, res: Response): Promise<void>;
}
