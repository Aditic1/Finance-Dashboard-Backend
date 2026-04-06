import { AnalyticsService } from "./analytics.interface";
import { analyticsRepo } from "./analytics.repository";
import {
  CategoryTotal,
  FinancialSummary,
  RecentActivity,
  TrendData,
} from "./analytics.types";

const getFinancialSummary = async (): Promise<FinancialSummary> => {
  const summary = await analyticsRepo.getFinancialSummary();
  return summary;
};

const getCategoryTotal = async (): Promise<CategoryTotal[]> => {
  const total = await analyticsRepo.getCategoryTotal();
  return total;
};

const getTrendData = async (period: string): Promise<TrendData[]> => {
  const trend = await analyticsRepo.getTrendData(period);
  return trend;
};

const getRecentActivity = async (limit: number): Promise<RecentActivity[]> => {
  const recent = await analyticsRepo.getRecentActivity(limit);
  return recent;
};

export const analyticsService: AnalyticsService = {
  getFinancialSummary,
  getCategoryTotal,
  getRecentActivity,
  getTrendData,
};
