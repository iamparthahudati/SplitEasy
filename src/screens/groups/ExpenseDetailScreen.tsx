import React from 'react';
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

type Props = NativeStackScreenProps<GroupsStackParamList, 'ExpenseDetail'>;

// ─── Mock data ────────────────────────────────────────────────────────────────

interface SplitEntry {
  member: string;
  share: number;         // amount they owe (or paid if payer)
  isPayer: boolean;
  isSettled: boolean;
}

interface MockExpenseDetail {
  id: string;
  name: string;
  amount: number;
  currency: string;
  categoryIcon: string;
  category: string;
  paidBy: string;
  date: string;
  fullDate: string;
  note?: string;
  splits: SplitEntry[];
  groupName: string;
  groupColor: string;
  yourShare: number;
}

const MOCK_EXPENSES: Record<string, MockExpenseDetail> = {
  // Group 1 — Spain Trip
  'e1': {
    id: 'e1', groupName: 'Spain Trip 2024', groupColor: '#6366F1',
    name: 'Hotel Barcelona', amount: 350.00, currency: '$',
    categoryIcon: '🏠', category: 'Stay', paidBy: 'You',
    date: 'Apr 10', fullDate: 'April 10, 2024 · 2:14 PM',
    note: 'Two nights at Hotel Arts. Shared twin room.',
    yourShare: 140.00,
    splits: [
      { member: 'You',    share:  70.00, isPayer: true,  isSettled: false },
      { member: 'Alex',   share:  70.00, isPayer: false, isSettled: false },
      { member: 'Jordan', share:  70.00, isPayer: false, isSettled: true  },
      { member: 'Sam',    share:  70.00, isPayer: false, isSettled: false },
      { member: 'Chris',  share:  70.00, isPayer: false, isSettled: true  },
    ],
  },
  'e2': {
    id: 'e2', groupName: 'Spain Trip 2024', groupColor: '#6366F1',
    name: 'Airport Taxi', amount: 65.00, currency: '$',
    categoryIcon: '✈️', category: 'Travel', paidBy: 'Alex',
    date: 'Apr 9', fullDate: 'April 9, 2024 · 7:45 PM',
    yourShare: -13.00,
    splits: [
      { member: 'You',    share: 13.00, isPayer: false, isSettled: false },
      { member: 'Alex',   share: 13.00, isPayer: true,  isSettled: false },
      { member: 'Jordan', share: 13.00, isPayer: false, isSettled: false },
      { member: 'Sam',    share: 13.00, isPayer: false, isSettled: true  },
      { member: 'Chris',  share: 13.00, isPayer: false, isSettled: false },
    ],
  },
  'e3': {
    id: 'e3', groupName: 'Spain Trip 2024', groupColor: '#6366F1',
    name: 'Dinner at El Born', amount: 120.00, currency: '$',
    categoryIcon: '🍽️', category: 'Food', paidBy: 'Jordan',
    date: 'Apr 9', fullDate: 'April 9, 2024 · 9:30 PM',
    note: 'Amazing tapas — must go back!',
    yourShare: -24.00,
    splits: [
      { member: 'You',    share: 24.00, isPayer: false, isSettled: false },
      { member: 'Alex',   share: 24.00, isPayer: false, isSettled: false },
      { member: 'Jordan', share: 24.00, isPayer: true,  isSettled: false },
      { member: 'Sam',    share: 24.00, isPayer: false, isSettled: false },
      { member: 'Chris',  share: 24.00, isPayer: false, isSettled: false },
    ],
  },
  'e4': {
    id: 'e4', groupName: 'Spain Trip 2024', groupColor: '#6366F1',
    name: 'Sagrada Familia tickets', amount: 200.00, currency: '$',
    categoryIcon: '⚽', category: 'Activity', paidBy: 'You',
    date: 'Apr 8', fullDate: 'April 8, 2024 · 3:00 PM',
    yourShare: 160.00,
    splits: [
      { member: 'You',    share: 40.00, isPayer: true,  isSettled: false },
      { member: 'Alex',   share: 40.00, isPayer: false, isSettled: false },
      { member: 'Jordan', share: 40.00, isPayer: false, isSettled: false },
      { member: 'Sam',    share: 40.00, isPayer: false, isSettled: false },
      { member: 'Chris',  share: 40.00, isPayer: false, isSettled: true  },
    ],
  },
  'e5': {
    id: 'e5', groupName: 'Spain Trip 2024', groupColor: '#6366F1',
    name: 'Groceries', amount: 80.00, currency: '$',
    categoryIcon: '🛒', category: 'Grocery', paidBy: 'Sam',
    date: 'Apr 7', fullDate: 'April 7, 2024 · 11:15 AM',
    yourShare: -16.00,
    splits: [
      { member: 'You',    share: 16.00, isPayer: false, isSettled: false },
      { member: 'Alex',   share: 16.00, isPayer: false, isSettled: true  },
      { member: 'Jordan', share: 16.00, isPayer: false, isSettled: false },
      { member: 'Sam',    share: 16.00, isPayer: true,  isSettled: false },
      { member: 'Chris',  share: 16.00, isPayer: false, isSettled: false },
    ],
  },
  // Group 2 — Flat Bills
  'e1_2': {
    id: 'e1_2', groupName: 'Flat Bills', groupColor: '#059669',
    name: 'Electricity — April', amount: 126.00, currency: '$',
    categoryIcon: '💡', category: 'Utility', paidBy: 'Mike',
    date: 'Apr 1', fullDate: 'April 1, 2024 · 8:00 AM',
    yourShare: -42.00,
    splits: [
      { member: 'You',  share: 42.00, isPayer: false, isSettled: false },
      { member: 'Mike', share: 42.00, isPayer: true,  isSettled: false },
      { member: 'Emma', share: 42.00, isPayer: false, isSettled: false },
    ],
  },
};

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

function getMemberAvatar(name: string, size = 36) {
  const bg = getAvatarColor(name);
  return { bg, initials: getInitials(name), size };
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ExpenseDetailScreen({ route, navigation }: Props) {
  const { expenseId, groupId } = route.params;

  // Resolve expense — try direct id then group-scoped fallback
  const expense = MOCK_EXPENSES[expenseId] ?? MOCK_EXPENSES[`${expenseId}_${groupId}`];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: expense?.name ?? 'Expense',
      headerRight: () => (
        <Pressable
          hitSlop={12}
          onPress={() =>
            expense && navigation.navigate('EditExpense', { expenseId, groupId })
          }
        >
          <Text style={styles.editLink}>Edit</Text>
        </Pressable>
      ),
    });
  }, [navigation, expense, expenseId, groupId]);

  if (!expense) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Expense not found</Text>
      </View>
    );
  }

  const isPos = expense.yourShare > 0;
  const isNeg = expense.yourShare < 0;

  const paidByYou = expense.paidBy === 'You';
  const pending = expense.splits.filter(s => !s.isPayer && !s.isSettled);
  const settled = expense.splits.filter(s => !s.isPayer && s.isSettled);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero card ──────────────────────────────────────────────── */}
      <View style={[styles.heroCard, { borderTopColor: expense.groupColor }]}>
        {/* Category icon */}
        <View style={[styles.heroIcon, { backgroundColor: expense.groupColor + '15' }]}>
          <Text style={styles.heroEmoji}>{expense.categoryIcon}</Text>
        </View>

        <Text style={styles.heroName}>{expense.name}</Text>

        <Text style={styles.heroAmount}>
          {expense.currency}{expense.amount.toFixed(2)}
        </Text>

        {/* Your balance pill */}
        <View style={[
          styles.yourSharePill,
          isPos ? styles.pillPos : isNeg ? styles.pillNeg : styles.pillZero,
        ]}>
          <Text style={[
            styles.yourShareText,
            isPos ? styles.textPos : isNeg ? styles.textNeg : styles.textZero,
          ]}>
            {expense.yourShare === 0
              ? 'Your share is settled'
              : isPos
                ? `You are owed ${expense.currency}${expense.yourShare.toFixed(2)}`
                : `You owe ${expense.currency}${Math.abs(expense.yourShare).toFixed(2)}`}
          </Text>
        </View>

        <View style={styles.heroDivider} />

        {/* Meta row */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Paid by</Text>
            <Text style={styles.metaValue}>{paidByYou ? 'You' : expense.paidBy}</Text>
          </View>
          <View style={styles.metaItemDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{expense.fullDate}</Text>
          </View>
          <View style={styles.metaItemDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Category</Text>
            <Text style={styles.metaValue}>{expense.category}</Text>
          </View>
        </View>

        {/* Note */}
        {expense.note ? (
          <View style={styles.noteBox}>
            <Text style={styles.noteIcon}>📝</Text>
            <Text style={styles.noteText}>{expense.note}</Text>
          </View>
        ) : null}
      </View>

      {/* ── Split breakdown ──────────────────────────────────────────── */}
      <Text style={styles.sectionLabel}>Split Breakdown</Text>
      <View style={styles.card}>
        {/* Payer row */}
        {expense.splits
          .filter(s => s.isPayer)
          .map(s => {
            const av = getMemberAvatar(s.member);
            return (
              <View key={s.member} style={styles.splitRow}>
                <View style={[styles.avatar, { backgroundColor: av.bg + '20', width: av.size, height: av.size, borderRadius: av.size / 2 }]}>
                  <Text style={[styles.avatarText, { color: av.bg }]}>{av.initials}</Text>
                </View>
                <View style={styles.splitInfo}>
                  <Text style={styles.splitName}>{s.member}</Text>
                  <View style={styles.payerBadge}>
                    <Text style={styles.payerBadgeText}>paid</Text>
                  </View>
                </View>
                <Text style={styles.splitPaidAmount}>
                  {expense.currency}{expense.amount.toFixed(2)}
                </Text>
              </View>
            );
          })}

        <View style={styles.splitDivider} />

        {/* Other members */}
        {expense.splits
          .filter(s => !s.isPayer)
          .map((s, idx, arr) => {
            const av = getMemberAvatar(s.member);
            const isLast = idx === arr.length - 1;
            return (
              <React.Fragment key={s.member}>
                <View style={styles.splitRow}>
                  <View style={[styles.avatar, { backgroundColor: av.bg + '20', width: av.size, height: av.size, borderRadius: av.size / 2 }]}>
                    <Text style={[styles.avatarText, { color: av.bg }]}>{av.initials}</Text>
                  </View>
                  <Text style={styles.splitName}>{s.member}</Text>
                  <View style={styles.splitRight}>
                    <Text style={styles.splitShareAmount}>
                      {expense.currency}{s.share.toFixed(2)}
                    </Text>
                    {s.isSettled ? (
                      <View style={styles.settledChip}>
                        <Text style={styles.settledChipText}>✓ Settled</Text>
                      </View>
                    ) : (
                      <View style={styles.owesChip}>
                        <Text style={styles.owesChipText}>Owes</Text>
                      </View>
                    )}
                  </View>
                </View>
                {!isLast && <View style={styles.rowSeparator} />}
              </React.Fragment>
            );
          })}
      </View>

      {/* ── Summary strip ────────────────────────────────────────────── */}
      <View style={styles.summaryStrip}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{pending.length}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.pos }]}>{settled.length}</Text>
          <Text style={styles.summaryLabel}>Settled</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{expense.splits.length - 1}</Text>
          <Text style={styles.summaryLabel}>Members</Text>
        </View>
      </View>

      {/* ── Settle Up CTA ────────────────────────────────────────────── */}
      {isNeg && (
        <Pressable
          style={styles.settleBtn}
          onPress={() => navigation.navigate('SettleUp', { groupId })}
        >
          <Text style={styles.settleBtnText}>Settle Up</Text>
        </Pressable>
      )}

      <View style={{ height: spacing[8] }} />
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: spacing[4] },

  editLink: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
    paddingRight: spacing[2],
  },

  // Hero card
  heroCard: {
    margin: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing[5],
    borderTopWidth: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    gap: spacing[3],
  },
  heroIcon: {
    width: 68,
    height: 68,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: { fontSize: 34 },
  heroName: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    textAlign: 'center',
  },
  heroAmount: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    letterSpacing: -1,
  },
  yourSharePill: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
  },
  pillPos:  { backgroundColor: colors.posBg },
  pillNeg:  { backgroundColor: colors.negBg },
  pillZero: { backgroundColor: colors.brandLight },
  yourShareText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
  },
  textPos:  { color: colors.pos },
  textNeg:  { color: colors.neg },
  textZero: { color: colors.brand },

  heroDivider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
  },

  // Meta row
  metaRow: {
    flexDirection: 'row',
    width: '100%',
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metaItemDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  metaLabel: {
    fontSize: fontSizes.xs,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
    textAlign: 'center',
  },

  // Note
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[2],
    width: '100%',
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    padding: spacing[3],
  },
  noteIcon: { fontSize: fontSizes.base },
  noteText: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.text3,
    lineHeight: 20,
  },

  // Section label
  sectionLabel: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Split breakdown card
  card: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3] + 1,
    gap: spacing[3],
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold as any,
  },
  splitInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  splitName: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  payerBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    backgroundColor: colors.brandLight,
    borderRadius: radius.pill,
  },
  payerBadgeText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },
  splitPaidAmount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },
  splitDivider: {
    height: 1,
    backgroundColor: colors.borderMid,
    marginHorizontal: spacing[4],
  },
  splitRight: {
    alignItems: 'flex-end',
    gap: 3,
  },
  splitShareAmount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  settledChip: {
    paddingHorizontal: spacing[2],
    paddingVertical: 1,
    backgroundColor: colors.posBg,
    borderRadius: radius.pill,
  },
  settledChipText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.pos,
  },
  owesChip: {
    paddingHorizontal: spacing[2],
    paddingVertical: 1,
    backgroundColor: colors.pendBg,
    borderRadius: radius.pill,
  },
  owesChipText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.pend,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[4] + 36 + spacing[3],
  },

  // Summary strip
  summaryStrip: {
    flexDirection: 'row',
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing[3],
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryValue: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },
  summaryLabel: {
    fontSize: fontSizes.xs,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
  },

  // Settle up CTA
  settleBtn: {
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  settleBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
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