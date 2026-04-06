import { Role } from "@prisma/client";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  activityStatus?: boolean;
}
