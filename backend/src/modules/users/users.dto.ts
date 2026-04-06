import { Role } from "@prisma/client";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  activityStatus: boolean;
  createdAt: Date;
}