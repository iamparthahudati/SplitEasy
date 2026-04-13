import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import type { GroupsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<GroupsStackParamList, 'SettleUp'>;

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface MemberBalance {
  name: string;
  balance: number; // positive = owed to them, negative = they owe
}

interface Settlement {
  id: string;
  from: string;
  to: string;
  amount: number;
}

interface GroupSettleData {
  groupName: string;
  emoji: string;
  color: string;
  currency: string;
  totalExpenses: number;
  balances: MemberBalance[];
}

const GROUP_SETTLE_DATA: Record<string, GroupSettleData> = {
  '1': {
    groupName: 'Spain Trip 2024', emoji: '✈️', color: colors.brand,
    currency: '$', totalExpenses: 815.00,
    balances: [
      { name: 'You',    balance:  124.50 },
      { name: 'Alex',   balance:  -13.00 },
      { name: 'Jordan', balance:  -24.00 },
      { name: 'Sam',    balance:  -71.50 },
      { name: 'Chris',  balance:  -16.00 },
    ],
  },
  '2': {
    groupName: 'Flat Bills', emoji: '🏠', color: '#059669',
    currency: '$', totalExpenses: 231.00,
    balances: [
      { name: 'You',  balance: -42.00 },
      { name: 'Mike', balance:  27.00 },
      { name: 'Emma', balance:  15.00 },
    ],
  },
  '3': {
    groupName: 'Weekend Ski', emoji: '🎿', color: '#0891B2',
    currency: '$', totalExpenses: 740.00,
    balances: [
      { name: 'You',    balance:  0 },
      { name: 'Riley',  balance:  0 },
      { name: 'Taylor', balance:  0 },
      { name: 'Morgan', balance:  0 },
    ],
  },
  '4': {
    groupName: 'Pizza Fridays', emoji: '🍕', color: '#DC2626',
    currency: '$', totalExpenses: 292.50,
    balances: [
      { name: 'You',   balance:  18.75 },
      { name: 'Ben',   balance: -16.00 },
      { name: 'Chloe', balance: -14.00 },
      { name: 'Dan',   balance:   3.75 },
      { name: 'Eve',   balance:   3.75 },
      { name: 'Finn',  balance:   3.75 },
    ],
  },
};

// ─── Simplify debts algorithm (greedy) ────────────────────────────────────────

function computeSettlements(balances: MemberBalance[], currency: string): Settlement[] {
  // Clone and filter zeroes
  const debtors = balances
    .filter(b => b.balance < -0.005)
    .map(b => ({ name: b.name, amount: Math.abs(b.balance) }))
    .sort((a, b) => b.amount - a.amount);

  const creditors = balances
    .filter(b => b.balance > 0.005)
    .map(b => ({ name: b.name, amount: b.balance }))
    .sort((a, b) => b.amount - a.amount);

  const settlements: Settlement[] = [];
  let id = 0;

  let di = 0;
  let ci = 0;

  while (di < debtors.length && ci < creditors.length) {
    const debt = debtors[di];
    const credit = creditors[ci];
    const amount = Math.min(debt.amount, credit.amount);

    if (amount > 0.005) {
      settlements.push({
        id: String(id++),
        from: debt.name,
        to: credit.name,
        amount: parseFloat(amount.toFixed(2)),
      });
    }

    debt.amount -= amount;
    credit.amount -= amount;

    if (debt.amount < 0.005) di++;
    if (credit.amount < 0.005) ci++;
  }

  return settlements;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAvatarColor(name: string) {
  const palette = ['#6366F1', '#059669', '#0891B2', '#DC2626', '#D97706', '#7C3AED'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

function getInitials(name: string) {
  return name === 'You' ? 'Me' : name.slice(0, 2).toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const bg = getAvatarColor(name);
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg + '20' }]}>
      <Text style={[styles.avatarText, { color: bg, fontSize: size < 36 ? fontSizes.xs : fontSizes.sm }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function SettleUpScreen({ route, navigation }: Props) {
  const { groupId } = route.params;
  const data = GROUP_SETTLE_DATA[groupId];

  const [settledIds, setSettledIds] = useState<Set<string>>(new Set());

  if (!data) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Group not found</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: 'Settle Up' });
  }, [navigation]);

  const allSettlements = computeSettlements(data.balances, data.currency);
  const pendingSettlements = allSettlements.filter(s => !settledIds.has(s.id));
  const completedSettlements = allSettlements.filter(s => settledIds.has(s.id));
  const isAllSettled = pendingSettlements.length === 0;

  const myBalanceObj = data.balances.find(b => b.name === 'You');
  const myBalance = myBalanceObj?.balance ?? 0;

  function markSettled(id: string) {
    setSettledIds(prev => new Set(prev).add(id));
  }

  function undoSettled(id: string) {
    setSettledIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Summary card ─────────────────────────────────────────────── */}
      <View style={[styles.summaryCard, { borderTopColor: data.color }]}>
        <View style={styles.summaryTop}>
          <View style={[styles.groupEmojiBg, { backgroundColor: data.color + '15' }]}>
            <Text style={styles.groupEmoji}>{data.emoji}</Text>
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryGroupName}>{data.groupName}</Text>
            <Text style={styles.summaryTotalExp}>
              {data.currency}{data.totalExpenses.toFixed(2)} total expenses
            </Text>
          </View>
        </View>

        <View style={styles.summaryDivider} />

        {/* My balance */}
        <View style={styles.myBalanceRow}>
          <Text style={styles.myBalanceLabel}>Your balance</Text>
          <View style={[
            styles.myBalancePill,
            myBalance > 0 ? styles.pillPos : myBalance < 0 ? styles.pillNeg : styles.pillZero,
          ]}>
            <Text style={[
              styles.myBalanceAmount,
              myBalance > 0 ? styles.amtPos : myBalance < 0 ? styles.amtNeg : styles.amtZero,
            ]}>
              {myBalance === 0
                ? 'Settled up'
                : myBalance > 0
                  ? `+${data.currency}${myBalance.toFixed(2)} owed to you`
                  : `-${data.currency}${Math.abs(myBalance).toFixed(2)} you owe`}
            </Text>
          </View>
        </View>
      </View>

      {/* ── All settled hero ─────────────────────────────────────────── */}
      {isAllSettled && (
        <View style={styles.allSettledCard}>
          <Text style={styles.allSettledIcon}>🎉</Text>
          <Text style={styles.allSettledTitle}>All settled up!</Text>
          <Text style={styles.allSettledSub}>
            Everyone in this group is even.
          </Text>
        </View>
      )}

      {/* ── Pending settlements ──────────────────────────────────────── */}
      {pendingSettlements.length > 0 && (
        <View style={styles.section}>
          <SectionLabel>Suggested payments</SectionLabel>
          <View style={styles.settlementList}>
            {pendingSettlements.map((s, i) => (
              <View
                key={s.id}
                style={[
                  styles.settlementCard,
                  i < pendingSettlements.length - 1 && styles.settlementCardBorder,
                ]}
              >
                <View style={styles.settlementFlow}>
                  {/* From */}
                  <View style={styles.settlementPerson}>
                    <Avatar name={s.from} size={44} />
                    <Text style={styles.settlementName}>{s.from}</Text>
                  </View>

                  {/* Arrow + amount */}
                  <View style={styles.settlementArrow}>
                    <Text style={styles.settlementAmount}>
                      {data.currency}{s.amount.toFixed(2)}
                    </Text>
                    <Text style={styles.arrowLine}>──────→</Text>
                  </View>

                  {/* To */}
                  <View style={styles.settlementPerson}>
                    <Avatar name={s.to} size={44} />
                    <Text style={styles.settlementName}>{s.to}</Text>
                  </View>
                </View>

                {/* CTA */}
                <Pressable
                  style={[
                    styles.markSettledBtn,
                    s.from === 'You' && styles.markSettledBtnPrimary,
                  ]}
                  onPress={() => markSettled(s.id)}
                >
                  <Text style={[
                    styles.markSettledBtnText,
                    s.from === 'You' && styles.markSettledBtnTextPrimary,
                  ]}>
                    {s.from === 'You' ? 'I paid this' : 'Record payment'}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ── Member balances ──────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionLabel>Member balances</SectionLabel>
        <View style={styles.balanceList}>
          {data.balances.map((b, i) => {
            const isPos = b.balance > 0;
            const isNeg = b.balance < 0;
            return (
              <View
                key={b.name}
                style={[
                  styles.balanceRow,
                  i < data.balances.length - 1 && styles.balanceRowBorder,
                ]}
              >
                <Avatar name={b.name} size={38} />
                <Text style={styles.balanceName}>{b.name}</Text>
                <View style={styles.balanceRight}>
                  {b.balance === 0 ? (
                    <View style={styles.settledPill}>
                      <Text style={styles.settledPillText}>Settled</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={[
                        styles.balanceAmount,
                        isPos ? styles.amtPos : styles.amtNeg,
                      ]}>
                        {isPos ? '+' : '-'}{data.currency}{Math.abs(b.balance).toFixed(2)}
                      </Text>
                      <Text style={styles.balanceDesc}>
                        {isPos ? 'gets back' : 'owes'}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── Completed settlements ────────────────────────────────────── */}
      {completedSettlements.length > 0 && (
        <View style={styles.section}>
          <SectionLabel>Recorded payments</SectionLabel>
          <View style={styles.completedList}>
            {completedSettlements.map(s => (
              <View key={s.id} style={styles.completedRow}>
                <View style={styles.completedCheck}>
                  <Text style={styles.completedCheckIcon}>✓</Text>
                </View>
                <Text style={styles.completedText}>
                  <Text style={styles.completedName}>{s.from}</Text>
                  {' paid '}
                  <Text style={styles.completedName}>{s.to}</Text>
                  {' '}
                  <Text style={styles.completedAmt}>
                    {data.currency}{s.amount.toFixed(2)}
                  </Text>
                </Text>
                <Pressable onPress={() => undoSettled(s.id)} hitSlop={8}>
                  <Text style={styles.undoBtn}>Undo</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: spacing[8] }} />
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: spacing[4] },

  // Summary card
  summaryCard: {
    margin: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing[4],
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  groupEmojiBg: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupEmoji: { fontSize: 26 },
  summaryInfo: { flex: 1 },
  summaryGroupName: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },
  summaryTotalExp: {
    fontSize: fontSizes.sm,
    color: colors.text4,
    marginTop: 2,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing[3],
  },
  myBalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myBalanceLabel: {
    fontSize: fontSizes.sm,
    color: colors.text3,
    fontWeight: fontWeights.medium as any,
  },
  myBalancePill: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
  },
  pillPos:  { backgroundColor: colors.posBg },
  pillNeg:  { backgroundColor: colors.negBg },
  pillZero: { backgroundColor: colors.brandLight },
  myBalanceAmount: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
  },
  amtPos:  { color: colors.pos },
  amtNeg:  { color: colors.neg },
  amtZero: { color: colors.brand },

  // All settled
  allSettledCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    backgroundColor: colors.posBg,
    borderRadius: radius.lg,
    padding: spacing[6],
    alignItems: 'center',
  },
  allSettledIcon: { fontSize: 40, marginBottom: spacing[2] },
  allSettledTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold as any,
    color: colors.pos,
    marginBottom: spacing[1],
  },
  allSettledSub: {
    fontSize: fontSizes.base,
    color: colors.pos,
    opacity: 0.8,
  },

  // Sections
  section: { marginBottom: spacing[4] },
  sectionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: spacing[5],
    marginBottom: spacing[2],
  },

  // Settlement cards
  settlementList: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  settlementCard: {
    padding: spacing[4],
  },
  settlementCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settlementFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  settlementPerson: {
    alignItems: 'center',
    gap: spacing[1],
    width: 60,
  },
  settlementName: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium as any,
    color: colors.text2,
    textAlign: 'center',
  },
  settlementArrow: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  settlementAmount: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },
  arrowLine: {
    fontSize: fontSizes.sm,
    color: colors.text4,
    letterSpacing: -2,
  },
  markSettledBtn: {
    height: 40,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markSettledBtnPrimary: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  markSettledBtnText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.text2,
  },
  markSettledBtnTextPrimary: {
    color: colors.white,
  },

  // Member balance list
  balanceList: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  balanceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  balanceName: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  balanceRight: { alignItems: 'flex-end', gap: 2 },
  balanceAmount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold as any,
  },
  balanceDesc: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },
  settledPill: {
    paddingHorizontal: spacing[3],
    paddingVertical: 2,
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderMid,
  },
  settledPillText: {
    fontSize: fontSizes.xs,
    color: colors.zero,
    fontWeight: fontWeights.medium as any,
  },

  // Avatar
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: fontWeights.bold as any,
  },

  // Completed
  completedList: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  completedCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.posBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCheckIcon: {
    fontSize: fontSizes.xs,
    color: colors.pos,
    fontWeight: fontWeights.bold as any,
  },
  completedText: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.text3,
  },
  completedName: {
    fontWeight: fontWeights.semibold as any,
    color: colors.text2,
  },
  completedAmt: {
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },
  undoBtn: {
    fontSize: fontSizes.sm,
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },

  // Not found
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  notFoundText: { fontSize: fontSizes.base, color: colors.text4 },
});