import { TransactionType, User } from "@prisma/client";

export interface CreateTransactionData {
  amount: number;
  type: TransactionType;
  transactionDate: Date;
  category: string;
  userId: string;
  description?: string;
}

export interface UpdateTransactionData {
  amount?: number;
  type?: TransactionType;
  transactionDate?: Date;
  category?: string;
  description?: string;
}

export interface TransactionFilters {
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  category?: string;
  userId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TransactionWithUserDTO {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  transactionDate: Date;
  description?: string;
  createdAt: Date;
  createdBy: { userId: string; name: string };
}
