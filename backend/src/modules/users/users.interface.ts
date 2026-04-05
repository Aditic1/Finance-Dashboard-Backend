import { User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
}
