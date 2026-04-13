import { calculateBalances, getSettlements } from '../settlement';

type Expense = { paidBy: string; amount: number; splits: Record<string, number> };
type Settle = { from: string; to: string; amount: number };

// ─── Test 1: Simple 2-person ────────────────────────────────────────────────
test('Test 1: Alex paid $100 for both → Jordan owes Alex $50', () => {
  const expenses = [
    { paidBy: 'Alex', amount: 100, splits: { Alex: 50, Jordan: 50 } },
  ];
  const balances = calculateBalances(expenses, []);
  expect(balances.Alex).toBe(50);
  expect(balances.Jordan).toBe(-50);

  const settlements = getSettlements(balances);
  expect(settlements).toHaveLength(1);
  expect(settlements[0]).toEqual({ from: 'Jordan', to: 'Alex', amount: 50 });
});

// ─── Test 2: 3-person complex — minimum payments ────────────────────────────
test('Test 2: 3-person complex reduces to minimum payments', () => {
  // Alex paid $90 for all three, Bob paid $30 for all three, Carol paid $0
  const expenses: Expense[] = [
    { paidBy: 'Alex', amount: 90, splits: { Alex: 30, Bob: 30, Carol: 30 } },
    { paidBy: 'Bob', amount: 30, splits: { Alex: 10, Bob: 10, Carol: 10 } },
  ];
  const balances = calculateBalances(expenses, []);
  // Alex: +90 -30 -10 = +50
  // Bob:  +30 -30 -10 = -10
  // Carol:    -30 -10 = -40
  expect(balances.Alex).toBe(50);
  expect(balances.Bob).toBe(-10);
  expect(balances.Carol).toBe(-40);

  const settlements = getSettlements(balances);
  // Should settle in 2 transactions (Carol→Alex $40, Bob→Alex $10)
  expect(settlements).toHaveLength(2);
  const total = settlements.reduce((sum, s) => sum + s.amount, 0);
  expect(Math.round(total * 100) / 100).toBe(50);
});

// ─── Test 3: All even — no settlements ──────────────────────────────────────
test('Test 3: Everyone paid exact share → no settlements needed', () => {
  const expenses: Expense[] = [
    { paidBy: 'Alex', amount: 30, splits: { Alex: 30 } },
    { paidBy: 'Bob', amount: 30, splits: { Bob: 30 } },
    { paidBy: 'Carol', amount: 30, splits: { Carol: 30 } },
  ];
  const balances = calculateBalances(expenses, []);
  expect(balances.Alex).toBe(0);
  expect(balances.Bob).toBe(0);
  expect(balances.Carol).toBe(0);

  const settlements = getSettlements(balances);
  expect(settlements).toHaveLength(0);
});

// ─── Test 4: Partial settlement — $30 paid of $50 debt → $20 remaining ──────
test('Test 4: Partial settlement leaves correct remainder', () => {
  const expenses = [
    { paidBy: 'Alex', amount: 100, splits: { Alex: 50, Jordan: 50 } },
  ];
  const partialSettlements = [{ from: 'Jordan', to: 'Alex', amount: 30 }];
  const balances = calculateBalances(expenses, partialSettlements);
  expect(balances.Alex).toBe(20);
  expect(balances.Jordan).toBe(-20);

  const remaining = getSettlements(balances);
  expect(remaining).toHaveLength(1);
  expect(remaining[0].amount).toBe(20);
});

// ─── Test 5: Rounding — $10 ÷ 3 people sums to exactly $10 ─────────────────
test('Test 5: $10 split 3 ways — shares sum correctly', () => {
  const share = Math.round((10 / 3) * 100) / 100; // 3.33
  const remainder = Math.round((10 - share * 2) * 100) / 100; // 3.34
  const expenses = [
    {
      paidBy: 'Alex',
      amount: 10,
      splits: { Alex: share, Bob: share, Carol: remainder },
    },
  ];
  const balances = calculateBalances(expenses, []);
  const totalDebts = Math.abs(balances.Bob) + Math.abs(balances.Carol);
  expect(Math.round(totalDebts * 100) / 100).toBe(Math.round((share + remainder) * 100) / 100);
  // Net sum of all balances should be zero
  const netSum = Object.values(balances).reduce((a, b) => a + b, 0);
  expect(Math.round(netSum * 100) / 100).toBe(0);
});

// ─── Test 6: Zero balance — already settled → empty array ───────────────────
test('Test 6: Already-settled group returns empty settlement array', () => {
  const expenses = [
    { paidBy: 'Alex', amount: 100, splits: { Alex: 50, Jordan: 50 } },
  ];
  const fullSettlements = [{ from: 'Jordan', to: 'Alex', amount: 50 }];
  const balances = calculateBalances(expenses, fullSettlements);
  expect(balances.Alex).toBe(0);
  expect(balances.Jordan).toBe(0);

  const settlements = getSettlements(balances);
  expect(settlements).toHaveLength(0);
});

// ─── Test 7: One person paid everything for 4 people ────────────────────────
test('Test 7: One person paid $200 for 4 people — 3 settlements', () => {
  const expenses = [
    {
      paidBy: 'Alex',
      amount: 200,
      splits: { Alex: 50, Bob: 50, Carol: 50, Dan: 50 },
    },
  ];
  const balances = calculateBalances(expenses, []);
  expect(balances.Alex).toBe(150);
  expect(balances.Bob).toBe(-50);
  expect(balances.Carol).toBe(-50);
  expect(balances.Dan).toBe(-50);

  const settlements = getSettlements(balances);
  expect(settlements).toHaveLength(3);
  settlements.forEach(s => {
    expect(s.to).toBe('Alex');
    expect(s.amount).toBe(50);
  });
});

// ─── Test 8: Multiple payers with cross-debts ────────────────────────────────
test('Test 8: Multiple payers with cross-debts simplify correctly', () => {
  // Alex owes Bob $20, Bob owes Carol $30 → Carol←Bob←Alex chain
  const expenses: Expense[] = [
    { paidBy: 'Bob', amount: 20, splits: { Bob: 0, Alex: 20 } },  // Alex owes Bob $20
    { paidBy: 'Carol', amount: 30, splits: { Carol: 0, Bob: 30 } }, // Bob owes Carol $30
  ];
  const balances = calculateBalances(expenses, []);
  expect(balances.Alex).toBe(-20);
  expect(balances.Bob).toBe(-10);  // received $20, paid $30 → net -$10
  expect(balances.Carol).toBe(30);

  const settlements = getSettlements(balances);
  // Should consolidate: Alex→Carol $20, Bob→Carol $10 (or equivalent)
  const totalPaidToCarol = settlements
    .filter(s => s.to === 'Carol')
    .reduce((sum, s) => sum + s.amount, 0);
  expect(totalPaidToCarol).toBe(30);
});

// ─── Test 9: Very small amounts ($0.01 edge case) ────────────────────────────
test('Test 9: $0.01 edge case is handled correctly', () => {
  const expenses = [
    { paidBy: 'Alex', amount: 0.01, splits: { Alex: 0, Jordan: 0.01 } },
  ];
  const balances = calculateBalances(expenses, []);
  expect(balances.Alex).toBe(0.01);
  expect(balances.Jordan).toBe(-0.01);

  const settlements = getSettlements(balances);
  expect(settlements).toHaveLength(1);
  expect(settlements[0].amount).toBe(0.01);
});

// ─── Test 10: Large group — 6 people, 10 expenses ───────────────────────────
test('Test 10: Large group (6 people, 10 expenses) balances net to zero', () => {
  const members = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank'];
  const expenses = [
    { paidBy: 'Alice', amount: 120, splits: { Alice: 20, Bob: 20, Carol: 20, Dave: 20, Eve: 20, Frank: 20 } },
    { paidBy: 'Bob', amount: 60, splits: { Alice: 10, Bob: 10, Carol: 10, Dave: 10, Eve: 10, Frank: 10 } },
    { paidBy: 'Carol', amount: 90, splits: { Alice: 15, Bob: 15, Carol: 15, Dave: 15, Eve: 15, Frank: 15 } },
    { paidBy: 'Dave', amount: 30, splits: { Alice: 5, Bob: 5, Carol: 5, Dave: 5, Eve: 5, Frank: 5 } },
    { paidBy: 'Eve', amount: 48, splits: { Alice: 8, Bob: 8, Carol: 8, Dave: 8, Eve: 8, Frank: 8 } },
    { paidBy: 'Frank', amount: 72, splits: { Alice: 12, Bob: 12, Carol: 12, Dave: 12, Eve: 12, Frank: 12 } },
    { paidBy: 'Alice', amount: 36, splits: { Alice: 6, Bob: 6, Carol: 6, Dave: 6, Eve: 6, Frank: 6 } },
    { paidBy: 'Bob', amount: 24, splits: { Alice: 4, Bob: 4, Carol: 4, Dave: 4, Eve: 4, Frank: 4 } },
    { paidBy: 'Carol', amount: 18, splits: { Alice: 3, Bob: 3, Carol: 3, Dave: 3, Eve: 3, Frank: 3 } },
    { paidBy: 'Dave', amount: 42, splits: { Alice: 7, Bob: 7, Carol: 7, Dave: 7, Eve: 7, Frank: 7 } },
  ];

  const balances = calculateBalances(expenses, []);

  // Net sum of all balances must equal 0
  const netSum = Object.values(balances).reduce((a, b) => a + b, 0);
  expect(Math.round(netSum * 100) / 100).toBe(0);

  // All 6 members present
  members.forEach(m => expect(balances).toHaveProperty(m));

  const settlements = getSettlements(balances);

  // After settlements, everyone should be zeroed out
  const verifyBalances = { ...balances };
  for (const s of settlements) {
    verifyBalances[s.from] = Math.round((verifyBalances[s.from] + s.amount) * 100) / 100;
    verifyBalances[s.to] = Math.round((verifyBalances[s.to] - s.amount) * 100) / 100;
  }
  members.forEach(m => {
    expect(Math.abs(verifyBalances[m])).toBeLessThanOrEqual(0.01);
  });
});
