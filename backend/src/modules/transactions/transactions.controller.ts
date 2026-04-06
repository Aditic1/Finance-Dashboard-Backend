import { TransactionType } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";
import { AppError } from "../../errors/AppError";
import { transactionsService } from "./transactions.service";
import {
  CreateTransactionData,
  TransactionFilters,
  TransactionWithUserDTO,
  UpdateTransactionData,
} from "./transactions.types";
import { getTransactionWithUserDTO } from "./utils/transactionDTO";
import { TransactionController } from "./transactions.interface";

const filtersSchema = z.object({
  type: z.enum(TransactionType).optional(),
  category: z.string().optional(),
  userId: z.string().optional(),
  search: z.string().optional(),
  startDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  endDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10)),
});

const getUserByIdSchema = z.object({
  id: z.string(),
});

const createTransactionSchema = z.object({
  amount: z.number(),
  type: z.enum(TransactionType),
  transactionDate: z.string().transform((val) => new Date(val)),
  category: z.string(),
  description: z.string().optional(),
});

const updateTransactionSchema = z.object({
  amount: z.number().optional(),
  type: z.enum(TransactionType).optional(),
  transactionDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  category: z.string().optional(),
  description: z.string().optional(),
});

const getAllTransactions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = filtersSchema.safeParse(req.query);
  if (!parsed.success) throw new AppError("Incorrect input field types.", 400);

  const filter: TransactionFilters = {
    type: parsed.data.type,
    startDate: parsed.data.startDate,
    endDate: parsed.data.endDate,
    category: parsed.data.category,
    userId: parsed.data.userId,
    search: parsed.data.search,
    page: parsed.data.page,
    limit: parsed.data.limit,
  };

  const transactions = await transactionsService.findAllTransactions(filter);
  const transactionsList: TransactionWithUserDTO[] = [];
  transactions.map((transaction) => {
    const dto = getTransactionWithUserDTO(transaction);
    transactionsList.push(dto);
  });
  res.status(200).json({ success: true, data: transactionsList });
};

const getTransactionById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = getUserByIdSchema.safeParse(req.params);
  if (!parsed.success) throw new AppError("UserId is required.", 400);

  const transaction = await transactionsService.findById(parsed.data.id);
  const transactionDTO = getTransactionWithUserDTO(transaction);

  res.status(200).json({ success: true, data: transactionDTO });
};

const createTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = createTransactionSchema.safeParse(req.body);

  if (!parsed.success) throw new AppError("Invalid data.", 400);
  if (!req.user?.id) throw new AppError("Invalid request", 400);

  const createData: CreateTransactionData = {
    amount: parsed.data.amount,
    type: parsed.data.type,
    transactionDate: parsed.data.transactionDate,
    category: parsed.data.category,
    userId: req.user.id,
    description: parsed.data.description,
  };
  const transaction = await transactionsService.createTransaction(createData);
  res.status(201).json({ success: true, data: transaction });
};

const updateTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = updateTransactionSchema.safeParse(req.body);
  const id = req.params.id;

  if (!id || typeof id !== "string") throw new AppError("Invalid input", 400);
  if (!parsed.success) throw new AppError("Invalid data.", 400);
  if (!req.user?.id) throw new AppError("Invalid request", 400);

  const updateData: UpdateTransactionData = {
    amount: parsed.data.amount,
    type: parsed.data.type,
    transactionDate: parsed.data.transactionDate,
    category: parsed.data.category,
    description: parsed.data.description,
  };
  const transaction = await transactionsService.updateTransaction(
    id,
    updateData,
  );
  res.status(200).json({ success: true, data: transaction });
};

const deleteTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = req.params.id;
  if (!id || typeof id !== "string") throw new AppError("Invalid input", 400);

  const deletedTransaction = await transactionsService.deleteTransaction(id);
  res.status(200).json({ success: true, data: deletedTransaction });
};

export const transactionsController: TransactionController = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
