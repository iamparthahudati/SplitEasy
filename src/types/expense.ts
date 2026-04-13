export interface Expense {
  id: string;
  name: string;
  amount: number;
  currency: string;
  originalAmount?: number;   // if multi-currency
  exchangeRate?: number;
  paidBy: string;            // member name (not userId)
  splits: Record<string, number>; // { 'Alex': 60, 'Jordan': 60 }
  splitMethod: 'equal' | 'exact' | 'percentage' | 'itemized';
  items?: Array<{ name: string; amount: number; assignedTo: string[] }>;
  category: string;
  notes?: string;
  photoUrl?: string;
  date: Date;
  createdAt: Date;
  createdBy: string;
  isRecurring?: boolean;
}

export interface Settlement {
  id: string;
  from: string;              // member name
  to: string;                // member name
  amount: number;
  settledAt: Date;
  settledBy: string;         // userId
}

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  paidBy: string;
  splits: Record<string, number>;
  frequency: 'monthly' | 'weekly';
  dayOfMonth: number;
  nextDate: Date;
  active: boolean;
}

export type ExpenseCategory =
  | 'stay'
  | 'food'
  | 'travel'
  | 'fun'
  | 'grocery'
  | 'utility'
  | 'activity'
  | 'other';

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  stay: 'Stay',
  food: 'Food',
  travel: 'Travel',
  fun: 'Fun',
  grocery: 'Grocery',
  utility: 'Utility',
  activity: 'Activity',
  other: 'Other',
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  stay: '🏠',
  food: '🍽️',
  travel: '✈️',
  fun: '🎉',
  grocery: '🛒',
  utility: '💡',
  activity: '⚽',
  other: '📦',
};
