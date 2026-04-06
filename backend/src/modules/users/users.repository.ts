import { User } from "@prisma/client";
import prisma from "../../config/db";
import { UsersRepository } from "./users.interface";
import { CreateUserData, UpdateUserData } from "./users.types";

const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const findAll = async (): Promise<User[]> => {
  const usersList = await prisma.user.findMany();
  return usersList;
};

const findById = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

const createUser = async (userData: CreateUserData): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      role: userData.role,
      password: userData.password,
      email: userData.email,
    },
  });

  return user;
};

const updateUser = async (
  userId: string,
  userData: UpdateUserData,
): Promise<User> => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: userData.name,
      role: userData.role,
      password: userData.password,
      email: userData.email,
    },
  });

  return updatedUser;
};

const deleteUser = async (userId: string): Promise<User> => {
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return deletedUser;
};

export const usersRepo: UsersRepository = {
  findByEmail,
  findAll,
  findById,
  createUser,
  updateUser,
  deleteUser,
};
