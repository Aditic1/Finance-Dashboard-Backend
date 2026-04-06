import { AppError } from "../../errors/AppError";
import { TransactionService } from "./transactions.interface";
import {
  transactionsRepo,
  TransactionWithUser,
} from "./transactions.repository";
import {
  CreateTransactionData,
  TransactionFilters,
  UpdateTransactionData,
} from "./transactions.types";
import { Transaction } from "@prisma/client";

const findAllTransactions = async (
  filters: TransactionFilters,
): Promise<TransactionWithUser[]> => {
  return await transactionsRepo.findAll(filters);
};

const findById = async (id: string): Promise<TransactionWithUser> => {
  const transaction = await transactionsRepo.findById(id);
  if (!transaction) throw new AppError("Transaction not found.", 404);
  return transaction;
};

const createTransaction = async (data: CreateTransactionData) => {
  const transaction = await transactionsRepo.create(data);
  return transaction;
};

const updateTransaction = async (
  transactionId: string,
  data: UpdateTransactionData,
): Promise<Transaction> => {
  const updatedTransaction = await transactionsRepo.update(transactionId, data);
  return updatedTransaction;
};

const deleteTransaction = async (
  transactionId: string,
): Promise<Transaction> => {
  const deletedTransaction =
    await transactionsRepo.deleteTransaction(transactionId);
  return deletedTransaction;
};

export const transactionsService: TransactionService = {
  findAllTransactions,
  findById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
