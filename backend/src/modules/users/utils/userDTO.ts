import { User } from "@prisma/client";
import { UserDTO } from "../users.dto";

export const getUserDTO = (user: User): UserDTO => {
  const userDTO: UserDTO = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    activityStatus: user.activityStatus,
    createdAt: user.createdAt,
  };

  return userDTO;
};
