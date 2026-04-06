import { Router } from "express";
import { transactionsController } from "./transactions.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorizeRole } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";

export const transactionsRouter = Router();

const allRoles = [Role.ADMIN, Role.ANALYST, Role.VIEWER];
const adminOnly = [Role.ADMIN];

transactionsRouter.use(authMiddleware);

transactionsRouter.get(
  "/",
  authorizeRole(allRoles),
  transactionsController.getAllTransactions,
);
transactionsRouter.get(
  "/:id",
  authorizeRole(allRoles),
  transactionsController.getTransactionById,
);
transactionsRouter.post(
  "/",
  authorizeRole(adminOnly),
  transactionsController.createTransaction,
);
transactionsRouter.patch(
  "/:id",
  authorizeRole(adminOnly),
  transactionsController.updateTransaction,
);
transactionsRouter.delete(
  "/:id",
  authorizeRole(adminOnly),
  transactionsController.deleteTransaction,
);
