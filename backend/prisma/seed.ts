import { PrismaClient, Role, TransactionType } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { config } from "../src/config/env";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = [
  "salary",
  "rent",
  "food",
  "transport",
  "utilities",
  "entertainment",
  "healthcare",
  "education",
  "investment",
  "misc",
];

async function main() {
  const rawPassword = config.adminPassword;
  const adminEmail = config.adminEmail;
  const hashedPassword = await hashPassword(rawPassword);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin User",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("Admin user seeded");

  const transactions = Array.from({ length: 100000 }, () => ({
    amount: parseFloat(faker.finance.amount({ min: 10, max: 100000 })),
    type: faker.helpers.arrayElement([
      TransactionType.INCOME,
      TransactionType.EXPENSE,
    ]),
    category: faker.helpers.arrayElement(categories),
    transactionDate: faker.date.between({
      from: "2024-01-01",
      to: "2026-04-01",
    }),
    userId: user.id,
    description: faker.helpers.maybe(
      () => faker.finance.transactionDescription(),
      { probability: 0.5 },
    ),
  }));

  const BATCH_SIZE = 5000;
  for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
    const batch = transactions.slice(i, i + BATCH_SIZE);
    await prisma.transaction.createMany({ data: batch });
    console.log(
      `Seeded batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(transactions.length / BATCH_SIZE)}`,
    );
  }

  console.log("100K transactions seeded");
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
