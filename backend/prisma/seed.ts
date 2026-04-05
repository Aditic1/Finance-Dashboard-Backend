import { PrismaClient, Transaction } from "@prisma/client";
import { Role } from "@prisma/client";
import { hashPassword } from "../src/utils";
import { config } from "../src/config";

const prisma = new PrismaClient();

async function main() {
  const rawPassword = config.adminPassword;
  const adminEmail = config.adminEmail;

  const hasedPassword = await hashPassword(rawPassword);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Aditi Chauhan",
      password: hasedPassword,
      role: Role.ADMIN,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
