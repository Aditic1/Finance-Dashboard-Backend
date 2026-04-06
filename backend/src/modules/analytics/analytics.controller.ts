import { Request, Response } from "express";
import { analyticsService } from "./analytics.service";

const getFinancialSummary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const financialSummary = await analyticsService.getFinancialSummary();
  res.status(200).json({ success: true, data: financialSummary });
};

const getCategoryTotal = async (req: Request, res: Response): Promise<void> => {
  const categoryTotal = await analyticsService.getCategoryTotal();
  res.status(200).json({ success: true, data: categoryTotal });
};

const getTrendData = async (req: Request, res: Response): Promise<void> => {
  const period =
    typeof req.query.period === "string" ? req.query.period : "weekly";
  const trendData = await analyticsService.getTrendData(period);
  res.status(200).json({ success: true, data: trendData });
};

const getRecentActivity = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const limit =
    typeof req.query.limit === "string" ? parseInt(req.query.limit) : 10;
  const recentActivity = await analyticsService.getRecentActivity(limit);
  res.status(200).json({ success: true, data: recentActivity });
};

export const analyticsController = {
  getFinancialSummary,
  getCategoryTotal,
  getTrendData,
  getRecentActivity,
};
