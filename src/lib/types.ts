export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  type: TransactionType
  category: string
  date: string
  created_at: string
  updated_at: string
}

export interface TransactionFormData {
  description: string
  amount: string
  type: TransactionType
  category: string
  date: string
}

export interface DashboardSummary {
  totalIncome: number
  totalExpense: number
  balance: number
}

export interface CategoryTotal {
  category: string
  total: number
  color: string
}

export interface FilterState {
  month: number
  year: number
  category: string
  search: string
}
