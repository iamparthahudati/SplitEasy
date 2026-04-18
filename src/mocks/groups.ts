// ─── Mock data for Groups screens ─────────────────────────────────────────────

export interface MockGroup {
  id: string;
  emoji: string;
  color: string;
  name: string;
  subtitle: string;
  balance: number;
  memberCount: number;
  totalSpent: number;
}

export interface MockBalance {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  relation: string;
  balance: number;
}

export interface MockExpense {
  id: string;
  icon: string;
  name: string;
  paidBy: string;
  date: string;
  amount: number;
}

export const MOCK_GROUPS: MockGroup[] = [
  {
    id: '1',
    emoji: '✈️',
    color: '#3B82F6',
    name: 'Spain Trip 2024',
    subtitle: '5 members · Hotel Barcelona',
    balance: 124.5,
    memberCount: 5,
    totalSpent: 620.0,
  },
  {
    id: '2',
    emoji: '🏠',
    color: '#EF4444',
    name: 'Flat Bills',
    subtitle: '3 members · Netflix',
    balance: -42.0,
    memberCount: 3,
    totalSpent: 210.0,
  },
  {
    id: '3',
    emoji: '🍕',
    color: '#F59E0B',
    name: 'Pizza Fridays',
    subtitle: '4 members · Last: Mar 28',
    balance: 0,
    memberCount: 4,
    totalSpent: 96.0,
  },
  {
    id: '4',
    emoji: '🎂',
    color: '#EF4444',
    name: "Jake's Birthday",
    subtitle: '6 members · Dinner',
    balance: -18.75,
    memberCount: 6,
    totalSpent: 312.0,
  },
];

export const MOCK_BALANCES: MockBalance[] = [
  {
    id: '1',
    initials: 'AC',
    avatarColor: '#4F46E5',
    name: 'Alex Chen',
    relation: 'owes You',
    balance: 48.0,
  },
  {
    id: '2',
    initials: 'JM',
    avatarColor: '#059669',
    name: 'Jordan Mills',
    relation: 'owes You',
    balance: 36.5,
  },
  {
    id: '3',
    initials: 'SP',
    avatarColor: '#F97316',
    name: 'Sara Park',
    relation: 'owes',
    balance: -22.0,
  },
  {
    id: '4',
    initials: 'RK',
    avatarColor: '#6366F1',
    name: 'Raj Kumar',
    relation: '',
    balance: 0,
  },
];

export const MOCK_EXPENSES: MockExpense[] = [
  {
    id: '1',
    icon: '🏨',
    name: 'Hotel Barcelona',
    paidBy: 'You',
    date: 'Apr 13',
    amount: 248.0,
  },
  {
    id: '2',
    icon: '🍽',
    name: 'Dinner at La Boqueria',
    paidBy: 'Alice',
    date: 'Apr 12',
    amount: -84.0,
  },
  {
    id: '3',
    icon: '🚗',
    name: 'Airport Transfer',
    paidBy: 'You',
    date: 'Apr 11',
    amount: -20.0,
  },
];

/** Returns the group with the given id, falling back to the first group. */
export function getMockGroup(id: string): MockGroup {
  return MOCK_GROUPS.find(g => g.id === id) ?? MOCK_GROUPS[0];
}
