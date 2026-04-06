import { AnalyticsRepository } from "./analytics.interface";
import {
  CategoryTotal,
  FinancialSummary,
  RecentActivity,
  TrendData,
} from "./analytics.types";
import prisma from "../../config/db";

const getFinancialSummary = async (): Promise<FinancialSummary> => {
  const summary = await prisma.$queryRaw<FinancialSummary[]>`
SELECT 
  SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as "totalIncome",
  SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as "totalExpenses",
  SUM(CASE WHEN type = 'INCOME' THEN amount ELSE -amount END) as "netBalance"
FROM "Transaction"`;

  return summary[0];
};

const getCategoryTotal = async (): Promise<CategoryTotal[]> => {
  const total = await prisma.$queryRaw<
    CategoryTotal[]
  >`SELECT category, SUM(amount) as "total"
    FROM "Transaction"
    GROUP BY category
    ORDER BY total DESC `;

  return total;
};

const getTrendData = async (period: string): Promise<TrendData[]> => {
  const format = period === "monthly" ? "YYYY-MM" : "IYYY-IW";
  const trend = await prisma.$queryRaw<TrendData[]>`
    SELECT 
      TO_CHAR("transactionDate", ${format}) as period,
      SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as "totalIncome",
      SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as "totalExpenses"
    FROM "Transaction"
    GROUP BY period
    ORDER BY period DESC`;
  return trend;
};

const getRecentActivity = async (limit: number): Promise<RecentActivity[]> => {
  const recent = await prisma.$queryRaw<RecentActivity[]>`
    SELECT t.id, t.amount, t.type, t.category, t."transactionDate", u.name as "createdByName"
    FROM "Transaction" t
    JOIN "User" u ON t."userId" = u.id
    ORDER BY t."createdAt" DESC
    LIMIT ${limit}`;
  return recent;
};

export const analyticsRepo: AnalyticsRepository = {
  getFinancialSummary,
  getCategoryTotal,
  getRecentActivity,
  getTrendData,
};
