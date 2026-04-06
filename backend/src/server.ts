import express from "express";
import dotenv from "dotenv";
import prisma from "./config/db";
import { errorMiddleware } from "./middlewares/error.middlewares";
import logger from "./utils/logger";
import { authRouter } from "./modules/auth/auth.routes";
import { usersRouter } from "./modules/users/users.routes";
import { transactionsRouter } from "./modules/transactions/transactions.router";
import { analyticsRouter } from "./modules/analytics/analytics.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

prisma
  .$connect()
  .then(() => logger.info("Database connected"))
  .catch((e) => logger.error("Database connection failed", e));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);
app.use("/dashboard", analyticsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
