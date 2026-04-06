import { User } from "@prisma/client";
import { usersRepo } from "./users.repository";
import { AppError } from "../../errors/AppError";
import { CreateUserData, UpdateUserData } from "./users.types";
import { hashPassword } from "../../utils";
import { UserService } from "./users.interface";

const getAllUsers = async (): Promise<User[]> => {
  return usersRepo.findAll();
};

const getUserById = async (userId: string): Promise<User> => {
  const user = await usersRepo.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const createUser = async (userData: CreateUserData): Promise<User> => {
  const existing = await usersRepo.findByEmail(userData.email);
  if (existing) throw new AppError("Email already in use", 409);
  const hashedPassword = await hashPassword(userData.password);
  return usersRepo.createUser({ ...userData, password: hashedPassword });
};

const updateUser = async (
  userId: string,
  updatedData: UpdateUserData,
): Promise<User> => {
  await getUserById(userId);
  if (updatedData.password) {
    updatedData.password = await hashPassword(updatedData.password);
  }
  return usersRepo.updateUser(userId, updatedData);
};

const deleteUser = async (userId: string): Promise<User> => {
  await getUserById(userId);
  return usersRepo.deleteUser(userId);
};

export const userService: UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
