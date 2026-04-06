import { Request, Response } from "express";
import z from "zod";
import { AppError } from "../../errors/AppError";
import { userService } from "./users.service";
import { Role } from "@prisma/client";
import { CreateUserData, UpdateUserData } from "./users.types";
import { UserDTO } from "./users.dto";
import { getUserDTO } from "./utils/userDTO";
import { UserController } from "./users.interface";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string(),
  role: z.enum(Role),
});

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(Role).optional(),
  activityStatus: z.boolean().optional(),
});

const getUserByIdSchema = z.object({
  id: z.string(),
});

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();

  const usersList: UserDTO[] = [];
  users.map((user) => {
    const userDTO = getUserDTO(user);
    usersList.push(userDTO);
  });

  res.status(200).json({ success: true, data: usersList });
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const parsed = getUserByIdSchema.safeParse(req.params);
  if (!parsed.success) throw new AppError("UserId is required.", 400);

  const user = await userService.getUserById(parsed.data.id);
  const userDTO = getUserDTO(user);

  res.status(200).json({ success: true, data: userDTO });
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError("Required fields missing.", 400);

  const userData: CreateUserData = {
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
    role: parsed.data.role as Role,
  };

  const user = await userService.createUser(userData);
  const userDTO = getUserDTO(user);
  res.status(201).json({ success: true, data: userDTO });
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  if (!id || typeof id !== "string") throw new AppError("Invalid input", 400);
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError("Invalid input", 400);

  const updateData: UpdateUserData = {
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
    role: parsed.data.role as Role,
    activityStatus: parsed.data.activityStatus,
  };

  const updatedData = await userService.updateUser(id, updateData);
  const userDTO = getUserDTO(updatedData);

  res.status(200).json({ success: true, data: userDTO });
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  if (!id || typeof id !== "string") throw new AppError("Invalid input", 400);

  const deletedUser = await userService.deleteUser(id);
  const userDTO = getUserDTO(deletedUser);

  res.status(200).json({ success: true, data: userDTO });
};

export const usersController: UserController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
