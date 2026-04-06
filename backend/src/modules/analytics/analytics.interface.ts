import {
  CategoryTotal,
  FinancialSummary,
  RecentActivity,
  TrendData,
} from "./analytics.types";

export interface AnalyticsRepository {
  getFinancialSummary(): Promise<FinancialSummary>;
  getCategoryTotal(): Promise<CategoryTotal[]>;
  getTrendData(period: string): Promise<TrendData[]>;
  getRecentActivity(limit: number): Promise<RecentActivity[]>;
}

export interface AnalyticsService {
  getFinancialSummary(): Promise<FinancialSummary>;
  getCategoryTotal(): Promise<CategoryTotal[]>;
  getTrendData(period: string): Promise<TrendData[]>;
  getRecentActivity(limit: number): Promise<RecentActivity[]>;
}

export interface UserController {
  getFinancialSummary(req: Request, res: Response): Promise<void>;
  getCategoryTotal(req: Request, res: Response): Promise<void>;
  getTrendData(req: Request, res: Response): Promise<void>;
  getRecentActivity(req: Request, res: Response): Promise<void>;
}
