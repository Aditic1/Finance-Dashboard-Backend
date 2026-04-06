import { Transaction } from "@prisma/client";
import {
  CreateTransactionData,
  TransactionFilters,
  UpdateTransactionData,
} from "./transactions.types";
import prisma from "../../config/db";

export type TransactionWithUser = Transaction & {
  createdBy: { id: string; name: string };
};

const findAll = async (
  filters: TransactionFilters,
): Promise<TransactionWithUser[]> => {
  const {
    type,
    category,
    userId,
    search,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = filters;

  return prisma.transaction.findMany({
    where: {
      ...(type && { type }),
      ...(category && { category }),
      ...(userId && { userId }),
      ...(search && { description: { contains: search, mode: "insensitive" } }),
      ...(startDate &&
        endDate && { transactionDate: { gte: startDate, lte: endDate } }),
    },
    skip: (page - 1) * limit,
    take: limit,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { transactionDate: "desc" },
  });
};

const findById = async (
  transactionId: string,
): Promise<TransactionWithUser | null> => {
  return prisma.transaction.findUnique({
    where: { id: transactionId },
    include: { createdBy: { select: { id: true, name: true } } },
  });
};

const create = async (data: CreateTransactionData): Promise<Transaction> => {
  return prisma.transaction.create({ data: { ...data } });
};

const update = async (
  transactionId: string,
  data: UpdateTransactionData,
): Promise<Transaction> => {
  return prisma.transaction.update({
    where: { id: transactionId },
    data: { ...data },
  });
};

const deleteTransaction = async (
  transactionId: string,
): Promise<Transaction> => {
  return prisma.transaction.delete({ where: { id: transactionId } });
};

export const transactionsRepo = {
  findAll,
  findById,
  create,
  update,
  deleteTransaction,
};
