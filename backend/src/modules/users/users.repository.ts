import { User } from "@prisma/client";
import prisma from "../../config/db";
import { UsersRepository } from "./users.interface";


const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const usersRepo:UsersRepository = {
    findByEmail,
}
