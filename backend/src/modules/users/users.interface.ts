import { User } from "@prisma/client";
import { CreateUserData, UpdateUserData } from "./users.types";
import { Request, Response } from "express";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  findAll(): Promise<User[]>;

  createUser(data: CreateUserData): Promise<User>;
  updateUser(userId: string, data: UpdateUserData): Promise<User>;
  deleteUser(userId: string): Promise<User>;
}

export interface UserService {
  getAllUsers(): Promise<User[]>;
  getUserById(userId: string): Promise<User>;

  createUser(data: CreateUserData): Promise<User>;
  updateUser(userId: string, data: UpdateUserData): Promise<User>;
  deleteUser(userId: string): Promise<User>;
}

export interface UserController {
  getAllUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;

  createUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
}
