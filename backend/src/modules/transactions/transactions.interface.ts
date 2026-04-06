import { Transaction } from "@prisma/client";
import { TransactionWithUser } from "./transactions.repository";
import {
  CreateTransactionData,
  TransactionFilters,
  UpdateTransactionData,
} from "./transactions.types";
import { Request, Response } from "express";

export interface TransactionRepository {
  findAll(filters: TransactionFilters): Promise<TransactionWithUser[]>;
  findById(transactionId: string): Promise<TransactionWithUser | null>;
  create(data: CreateTransactionData): Promise<Transaction>;
  update(
    transactionId: string,
    data: UpdateTransactionData,
  ): Promise<Transaction>;
  deleteTransaction(transactionId: string): Promise<Transaction>;
}

export interface TransactionService {
  findAllTransactions(
    filters: TransactionFilters,
  ): Promise<TransactionWithUser[]>;
  findById(transactionId: string): Promise<TransactionWithUser>;
  createTransaction(data: CreateTransactionData): Promise<Transaction>;
  updateTransaction(
    transactionId: string,
    data: UpdateTransactionData,
  ): Promise<Transaction>;
  deleteTransaction(transactionId: string): Promise<Transaction>;
}

export interface TransactionController {
  getAllTransactions(req: Request, res: Response): Promise<void>;
  getTransactionById(req: Request, res: Response): Promise<void>;
  createTransaction(req: Request, res: Response): Promise<void>;
  updateTransaction(req: Request, res: Response): Promise<void>;
  deleteTransaction(req: Request, res: Response): Promise<void>;
}
