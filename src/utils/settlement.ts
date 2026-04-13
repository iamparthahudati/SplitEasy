export interface Balance {
  [memberName: string]: number;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

/**
 * Calculates the net balance for each member across all expenses and settlements.
 * Positive balance = owed money TO this member.
 * Negative balance = this member OWES money.
 */
export function calculateBalances(
  expenses: Array<{ paidBy: string; amount: number; splits: Record<string, number> }>,
  settlements: Array<{ from: string; to: string; amount: number }>,
): Balance {
  const balances: Balance = {};

  for (const exp of expenses) {
    balances[exp.paidBy] = (balances[exp.paidBy] || 0) + exp.amount;
    for (const [member, share] of Object.entries(exp.splits)) {
      balances[member] = (balances[member] || 0) - share;
    }
  }

  for (const s of settlements) {
    balances[s.from] = (balances[s.from] || 0) + s.amount;
    balances[s.to] = (balances[s.to] || 0) - s.amount;
  }

  for (const k of Object.keys(balances)) {
    balances[k] = Math.round(balances[k] * 100) / 100;
  }

  return balances;
}

/**
 * Converts a balance map into the minimum set of transactions needed to settle all debts.
 * Uses a greedy two-pointer algorithm: always pair the biggest debtor with the biggest creditor.
 */
export function getSettlements(balances: Balance): Settlement[] {
  const settlements: Settlement[] = [];
  const entries = Object.entries(balances)
    .map(([id, amount]) => ({ id, amount: Math.round(amount * 100) / 100 }))
    .filter(e => Math.abs(e.amount) >= 0.01)
    .sort((a, b) => a.amount - b.amount);

  let left = 0;
  let right = entries.length - 1;

  while (left < right) {
    const debtor = entries[left];
    const creditor = entries[right];
    const amount = Math.round(Math.min(-debtor.amount, creditor.amount) * 100) / 100;

    if (amount >= 0.01) {
      settlements.push({ from: debtor.id, to: creditor.id, amount });
    }

    debtor.amount += amount;
    creditor.amount -= amount;

    if (Math.abs(debtor.amount) < 0.01) { left++; }
    if (Math.abs(creditor.amount) < 0.01) { right--; }
  }

  return settlements;
}
