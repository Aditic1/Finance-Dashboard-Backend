export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface TrendData {
  period: string;
  totalIncome: number;
  totalExpenses: number;
}

export interface RecentActivity {
  id: string;
  amount: number;
  type: string;
  category: string;
  transactionDate: Date;
  createdByName: string;
}