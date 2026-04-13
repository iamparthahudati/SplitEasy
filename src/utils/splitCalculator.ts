/**
 * Compute equal split shares, distributing rounding remainder to first member.
 * Guarantees shares always sum to exactly `amount`.
 */
export function calculateEqualSplit(
  amount: number,
  members: string[],
): Record<string, number> {
  if (members.length === 0) { return {}; }
  const base = Math.floor((amount * 100) / members.length) / 100;
  const remainder = Math.round((amount - base * members.length) * 100) / 100;
  const splits: Record<string, number> = {};
  members.forEach((m, i) => {
    splits[m] = i === 0 ? Math.round((base + remainder) * 100) / 100 : base;
  });
  return splits;
}

/**
 * Validate that exact-amount splits sum to the total amount (within $0.01).
 */
export function validateExactSplit(
  amount: number,
  splits: Record<string, number>,
): { valid: boolean; diff: number } {
  const sum = Object.values(splits).reduce((a, b) => a + b, 0);
  const diff = Math.round((amount - sum) * 100) / 100;
  return { valid: Math.abs(diff) < 0.01, diff };
}

/**
 * Convert percentage splits to exact amounts.
 * Last member absorbs any rounding residual.
 */
export function percentageToAmounts(
  amount: number,
  percentages: Record<string, number>,
): Record<string, number> {
  const members = Object.keys(percentages);
  const splits: Record<string, number> = {};
  let allocated = 0;

  members.forEach((m, i) => {
    if (i === members.length - 1) {
      // Last member gets the remainder to ensure total is exact
      splits[m] = Math.round((amount - allocated) * 100) / 100;
    } else {
      const share = Math.round(((percentages[m] / 100) * amount) * 100) / 100;
      splits[m] = share;
      allocated += share;
    }
  });

  return splits;
}

/**
 * Validate that percentages sum to 100 (within 0.01).
 */
export function validatePercentages(
  percentages: Record<string, number>,
): { valid: boolean; diff: number } {
  const sum = Object.values(percentages).reduce((a, b) => a + b, 0);
  const diff = Math.round((100 - sum) * 100) / 100;
  return { valid: Math.abs(diff) < 0.01, diff };
}

/**
 * Build splits from itemized line items.
 * If an item is assigned to N people, each gets amount/N.
 */
export function calculateItemizedSplit(
  items: Array<{ name: string; amount: number; assignedTo: string[] }>,
): Record<string, number> {
  const splits: Record<string, number> = {};

  for (const item of items) {
    if (item.assignedTo.length === 0) { continue; }
    const share = Math.floor((item.amount * 100) / item.assignedTo.length) / 100;
    const remainder = Math.round((item.amount - share * item.assignedTo.length) * 100) / 100;

    item.assignedTo.forEach((m, i) => {
      const memberShare = i === 0 ? Math.round((share + remainder) * 100) / 100 : share;
      splits[m] = Math.round(((splits[m] || 0) + memberShare) * 100) / 100;
    });
  }

  return splits;
}
