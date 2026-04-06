import { Router } from "express";
import { analyticsController } from "./analytics.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorizeRole } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";

export const analyticsRouter = Router();
analyticsRouter.use(authMiddleware, authorizeRole([Role.ADMIN, Role.ANALYST]));

analyticsRouter.get("/category-total", analyticsController.getCategoryTotal);
analyticsRouter.get(
  "/financial-summary",
  analyticsController.getFinancialSummary,
);
analyticsRouter.get("/recent-activity", analyticsController.getRecentActivity);
analyticsRouter.get("/trend-data", analyticsController.getTrendData);
